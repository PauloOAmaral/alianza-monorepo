export function getUserInformationFromRequest(headers: Headers) {
    const userAgent = headers.get("user-agent")
    const ipAddress = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for")

    return { userAgent, ipAddress }
}
