import { loginWithGoogle } from '@alianza/application/auth/admin'
import { ApplicationError } from '@alianza/application/error'
import { href, redirect } from 'react-router'
import { createSession } from '~/middleware/session-middleware'
import { ENV } from '~/utils/env'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { redirectWithError } from '~/utils/server/toasts'
import type { Route } from './+types/auth.google.callback'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

async function exchangeCodeForTokens(code: string, request: Request): Promise<{ access_token: string }> {
    const redirectUri = `${new URL(request.url).origin}/auth/google/callback`
    const body = new URLSearchParams({
        code,
        client_id: ENV.GOOGLE_CLIENT_ID!,
        client_secret: ENV.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
    })

    const res = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    })

    if (!res.ok) {
        const err = await res.text()
        throw new Error(`Google token exchange failed: ${err}`)
    }

    return res.json() as Promise<{ access_token: string }>
}

async function getGoogleUserInfo(accessToken: string): Promise<{ id: string; email: string; given_name: string; family_name: string }> {
    const res = await fetch(GOOGLE_USERINFO_URL, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch Google user info')
    }

    const data = (await res.json()) as { id: string; email: string; given_name?: string; family_name?: string }
    return {
        id: data.id,
        email: data.email,
        given_name: data.given_name ?? '',
        family_name: data.family_name ?? ''
    }
}

export async function loader({ request }: Route.LoaderArgs) {
    if (!ENV.GOOGLE_CLIENT_ID || !ENV.GOOGLE_CLIENT_SECRET) {
        return redirect(href('/login'))
    }

    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
        return redirect(href('/login'))
    }

    if (!code) {
        return redirect(href('/login'))
    }

    try {
        const tokens = await exchangeCodeForTokens(code, request)
        const profile = await getGoogleUserInfo(tokens.access_token)

        const loginResponse = await loginWithGoogle(
            createRequest(request, {
                googleId: profile.id,
                email: profile.email,
                firstName: profile.given_name || profile.email.split('@')[0] || '',
                lastName: profile.family_name || ''
            })
        )

        const headers = await createSession(request, loginResponse.data.id)
        return redirect(href('/'), { headers })
    } catch (err) {
        if (err instanceof ApplicationError) {
            const message = await parseApplicationError(err, request)
            return redirectWithError(href('/login'), message)
        }
        return redirect(href('/login'))
    }
}

export default function AuthGoogleCallbackRoute() {
    return null
}
