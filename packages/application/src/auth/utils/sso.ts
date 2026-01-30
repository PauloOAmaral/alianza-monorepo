export function isSSO(email: string, tenantSamlProviders: { domain: string }[]) {
    const userDomain = getDomainFromEmail(email)

    const isSSO = tenantSamlProviders.some(provider => provider.domain.toLowerCase().trim() === userDomain)

    return isSSO
}

export function getDomainFromEmail(email: string) {
    const domain = email.split('@')[1]

    if (!domain) {
        throw new Error('Invalid email format')
    }

    return domain.toLowerCase().trim()
}
