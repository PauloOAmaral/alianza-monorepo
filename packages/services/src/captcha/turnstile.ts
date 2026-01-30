import { ENV } from '~/utils/env'

export async function validateTurnstile(response: string) {
    try {
        const validationResponse = await fetch(ENV.CLOUDFLARE_TURNSTILE_VERIFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: ENV.CLOUDFLARE_TURNSTILE_SECRET_KEY,
                response
            })
        })

        return validationResponse.json() as Promise<{ success: boolean }>
    } catch (_error) {
        return { success: false }
    }
}
