import { login } from '@alianza/application/auth/admin'
import { ApplicationError } from '@alianza/application/error'
import { validateTurnstile } from '@alianza/services/captcha/turnstile'
import { parseFormDataWithZod } from '@alianza/utils/forms'
import { data, href, redirect } from 'react-router'
import { LoginForm } from '~/features/auth/login-form'
import { loginWithPasswordSchema } from '~/features/auth/schema'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { createSession } from '~/middleware/session-middleware'
import { ENV } from '~/utils/env'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError } from '~/utils/server/toasts'
import type { Route } from './+types/login'

export function meta() {
    return [{ title: 'Login Alianza' }, { name: 'description', content: 'Login to your Alianza account' }]
}

export async function action({ request }: Route.ActionArgs) {
    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()

    const { success, value, errors } = await parseFormDataWithZod(formData, loginWithPasswordSchema(t))

    if (!success) {
        const message = Array.isArray(errors) ? errors.join('. ') : (errors ?? t('errors.serverError.unexpected'))

        return await dataWithError({ success: false, message }, errors ?? [], { status: 400 })
    }

    const { success: turnstileSuccess } = await validateTurnstile(value['cf-turnstile-response'] as string)

    if (!turnstileSuccess) {
        return dataWithError({ success: false, message: t('errors.common.invalidTurnstileResponse') }, { status: 400 })
    }

    try {
        const loginResponse = await login(
            createRequest(request, {
                email: value.email,
                password: value.password
            })
        )

        const headers = await createSession(request, loginResponse.data.id)

        return redirect(href('/'), { headers })
    } catch (error) {
        if (error instanceof ApplicationError) {
            return dataWithError({ success: false }, await parseApplicationError(error, request))
        }

        return dataWithError({ success: false }, t('errors.serverError.unexpected'))
    }
}

export async function loader() {
    return {
        siteKey: ENV.CLOUDFLARE_TURNSTILE_SITE_KEY
    }
}

export default function () {
    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <LoginForm />
            </div>
        </div>
    )
}
