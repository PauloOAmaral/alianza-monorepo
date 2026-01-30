import { type $ZodType, type output, safeParseAsync, type util } from 'zod/v4/core'

export async function parseFormDataWithZod<Schema extends $ZodType>(
    formData: FormData,
    schema: Schema
): Promise<{ success: true; value: output<Schema>; errors?: string[] } | { success: false; value: null; errors?: string[] }> {
    const nestedObj = formDataToNestedObject(formData)
    const result = (await safeParseAsync(schema, nestedObj)) as unknown as util.SafeParseResult<output<Schema>>

    if (result.success) {
        return { success: true, value: result.data, errors: undefined }
    }

    return {
        success: false,
        value: null,
        errors: result.error.issues.map(issue => issue.path.join('.') + ' ' + issue.message)
    }
}

/**
 * Converts FormData into a nested object structure, handling:
 * - Dot notation (e.g. "user.name")
 * - Bracket notation (e.g. "user[name]", "items[0]")
 * - Repeated fields into arrays
 */
function formDataToNestedObject(formData: FormData): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const [rawKey, value] of formData.entries()) {
        setDeepValue(result, rawKey, value)
    }

    return result
}

/**
 * Sets a value in an object given a path that might use dot/bracket notation.
 * If the same path is encountered more than once, it accumulates values into an array.
 */
function setDeepValue(obj: Record<string, any>, path: string, value: string | File) {
    const segments = parsePathToSegments(path)

    let current = obj
    for (let i = 0; i < segments.length; i++) {
        const part = segments[i]

        if (!part) {
            continue
        }

        const isLast = i === segments.length - 1

        if (isLast) {
            // If there's already a value, convert/append to an array.
            if (current[part] !== undefined) {
                if (!Array.isArray(current[part])) {
                    current[part] = [current[part]]
                }
                current[part].push(value)
            } else {
                current[part] = value
            }
        } else {
            // Not the last segment => ensure the next level is either object or array
            const nextPart = segments[i + 1]

            if (!nextPart) {
                continue
            }

            if (current[part] === undefined) {
                current[part] = isIndexSegment(nextPart) ? [] : {}
            }

            current = current[part]
        }
    }
}

/**
 * Breaks a path string like "user.name", "user[name]", or "items[0]" into discrete segments.
 */
function parsePathToSegments(path: string): string[] {
    // "items[0]" => "items 0"
    // "profile.contact.email" => ["profile", "contact", "email"]
    // "user[address]" => ["user", "address"]
    return path.replace(/\]/g, '').split(/\[|\./).filter(Boolean)
}

/**
 * Determines whether a segment is numeric. Used to decide
 * if a nested structure should become an array or an object.
 */
function isIndexSegment(segment: string): boolean {
    return /^\d+$/.test(segment)
}

/**
 * Recursively appends keys/values from an object to FormData.
 *
 * @param data - The data object to convert.
 * @param formData - The FormData instance (optional).
 * @param parentKey - The key from the parent object (for recursion).
 * @returns A FormData instance with all keys/values appended.
 */
export function objectToFormData(data: any, formData: FormData = new FormData(), parentKey?: string): FormData {
    if (data === null || typeof data === 'undefined') {
        return formData
    }

    // Handle Date values by converting them to ISO strings.
    if (data instanceof Date) {
        formData.append(parentKey!, data.toISOString())
        return formData
    }

    // Handle File objects (and Blob) directly.
    if (data instanceof File || data instanceof Blob) {
        formData.append(parentKey!, data)
        return formData
    }

    // Handle arrays
    if (Array.isArray(data)) {
        for (const [index, value] of data.entries()) {
            const key = parentKey ? `${parentKey}[${index}]` : index.toString()
            objectToFormData(value, formData, key)
        }
        return formData
    }

    // Handle objects (plain objects)
    if (typeof data === 'object') {
        for (const key of Object.keys(data)) {
            const value = data[key]
            const formKey = parentKey ? `${parentKey}[${key}]` : key
            objectToFormData(value, formData, formKey)
        }
        return formData
    }

    // Fallback: Append primitive values (string, number, boolean, etc.)
    if (parentKey) {
        formData.append(parentKey, data)
    }

    return formData
}
