export function getLatestPathSegment<T extends string>(pathname: string, defaultValue: T, afterSegment?: string): T {
    let modifiedPath = pathname

    if (afterSegment) {
        const index = pathname.indexOf(afterSegment)

        if (index !== -1) {
            modifiedPath = pathname.substring(index + afterSegment.length)
        }
    }

    const segments = modifiedPath.split('/').filter(Boolean)

    return (segments.at(-1) ?? defaultValue) as T
}

export function getSubstepsPathSegment<T extends string>(pathname: string, defaultValue: T): T {
    const segments = pathname.split('/').filter(Boolean)

    const substepsIndex = segments.indexOf('substeps')
    if (substepsIndex !== -1 && segments[substepsIndex + 1]) {
        return segments[substepsIndex + 1] as T
    }

    return defaultValue
}
