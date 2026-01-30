/**
 * Token encryption/decryption to be used on temporary tokens
 * Uses AES-GCM for authenticated encryption with automatic expiry handling
 *
 * Required environment variable:
 * - TOKEN_ENCRYPTION_KEY: Base64 encoded 256-bit key
 */

interface EncryptedPayload<T = any> {
    data: T
    expires: number
}

interface ValidationResult<T = any> {
    valid: boolean
    data?: T
    error?: string
}

/**
 * Retrieves and imports the encryption key from environment variables
 *
 * @returns The imported crypto key
 * @throws Error if TOKEN_ENCRYPTION_KEY is not found in environment
 */
async function getKey(): Promise<CryptoKey> {
    const keyString = process.env.TOKEN_ENCRYPTION_KEY

    if (!keyString) {
        throw new Error("TOKEN_ENCRYPTION_KEY not found in environment variables")
    }

    const keyData = Uint8Array.from(atob(keyString), (c) => c.charCodeAt(0))

    return await crypto.subtle.importKey("raw", keyData, { name: "AES-GCM", length: 256 }, false, [
        "encrypt",
        "decrypt",
    ])
}

/**
 * Encrypts any data with automatic expiry time
 * The data will be wrapped with an expiry timestamp before encryption
 *
 * @param data - Any JSON-serializable data to encrypt
 * @param ttlMinutes - Time to live in minutes (how long the token is valid)
 * @returns URL-safe encrypted token
 *
 * @example
 * const token = await encrypt({ userId: '123', fileId: 'abc' }, 60, env);
 * // Token will be valid for 60 minutes
 */
export async function encrypt<T>(data: T, ttlMinutes: number): Promise<string> {
    // Get encryption key
    const key = await getKey()

    // Wrap data with expiry time
    const payload: EncryptedPayload<T> = {
        data,
        expires: Date.now() + ttlMinutes * 60 * 1000,
    }

    // Convert to JSON and encode
    const jsonString = JSON.stringify(payload)
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(jsonString)

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Encrypt
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, dataBuffer)

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(encryptedData)
    const combined = new Uint8Array(iv.length + encryptedArray.length)

    combined.set(iv)
    combined.set(encryptedArray, iv.length)

    // Convert to URL-safe base64
    const base64 = btoa(String.fromCharCode(...combined))

    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

/**
 * Decrypts a token and returns the original data
 * This is a low-level function - use validate() instead for automatic expiry checking
 *
 * @param token - The encrypted token to decrypt
 * @returns Decrypted payload containing data and expires timestamp
 * @throws Error if decryption fails (invalid token)
 */
async function decrypt<T>(token: string): Promise<EncryptedPayload<T>> {
    // Get encryption key
    const key = await getKey()

    // Convert URL-safe base64 back to normal base64
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/")
    const paddedBase64 = base64 + "==".substring(0, (4 - (base64.length % 4)) % 4)

    // Convert to Uint8Array
    const combined = Uint8Array.from(atob(paddedBase64), (c) => c.charCodeAt(0))

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12)
    const encryptedData = combined.slice(12)

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedData)

    // Convert back to JSON
    const decoder = new TextDecoder()
    const jsonString = decoder.decode(decryptedBuffer)

    return JSON.parse(jsonString) as EncryptedPayload<T>
}

/**
 * Validates a token by decrypting it and checking if it's expired
 * This is the main function you should use for token validation
 *
 * @param token - The encrypted token to validate
 * @returns Object with valid boolean and either data or error message
 *          Returns {valid: true, data: <original data>} if token is valid and not expired
 *          Returns {valid: false, error: <reason>} if token is invalid or expired
 *
 * @example
 * const result = await validate<{userId: string, fileId: string}>(token, env);
 *
 * if (result.valid) {
 *   console.log('Token data:', result.data);
 * } else {
 *   console.log('Invalid token:', result.error);
 * }
 */
export async function validate<T = any>(token: string): Promise<ValidationResult<T>> {
    try {
        // Decrypt the token
        const payload = await decrypt<T>(token)

        // Check if expired
        if (payload.expires < Date.now()) {
            return {
                valid: false,
                error: "Token expired",
            }
        }

        // Token is valid, return the original data
        return {
            valid: true,
            data: payload.data,
        }
    } catch (_) {
        // Decryption failed - invalid token
        return {
            valid: false,
            error: "Invalid token",
        }
    }
}
