import { redirect } from 'react-router'
import { ENV } from '~/utils/env'
import type { Route } from './+types/auth.google'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const SCOPES = ['openid', 'email', 'profile'].join(' ')

export async function loader({ request }: Route.LoaderArgs) {
    const clientId = ENV.GOOGLE_CLIENT_ID
    const clientSecret = ENV.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        return redirect('/login')
    }

    const redirectUri = `${new URL(request.url).origin}/auth/google/callback`
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: SCOPES,
        access_type: 'offline',
        prompt: 'consent'
    })

    const url = `${GOOGLE_AUTH_URL}?${params.toString()}`
    return redirect(url)
}

export default function AuthGoogleRoute() {
    return null
}
