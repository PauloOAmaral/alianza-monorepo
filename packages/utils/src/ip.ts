/**
 * Normalizes IP addresses for consistent rate limit keys.
 * Returns null if IP is null/undefined (e.g., localhost development).
 */
export function normalizeIpAddress(ip: string | null | undefined): string | null {
    if (!ip || ip.trim() === "") {
        return null
    }

    const trimmed = ip.trim()

    if (trimmed.includes(":")) {
        return trimmed.toLowerCase()
    }

    return trimmed
}
