import { createMainDbClient } from '@alianza/database/clients/main'
import { SignupConfirmationHtml, type SignupConfirmationProps, SignupConfirmationText } from '@alianza/notifications/admin/templates'
import { resendClient } from '@alianza/services/email/resend'
import { z } from 'zod'
import { createAction } from '~/action-builder'
import { signup as baseSignup } from '~/auth/base'
import { ENV } from '~/utils/env'

const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    tenantName: z.string().min(1)
})

export const signup = createAction({ schema: signupSchema })
    .withData()
    .build(async ({ data }) => {
        const { email, password, firstName, lastName, tenantName } = data

        const db = createMainDbClient()

        const result = await baseSignup({
            data: { email, password, firstName, lastName, tenantName },
            dbClient: db
        })

        const signupConfirmationEmailProps: SignupConfirmationProps = {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            token: result.data.token
        }

        const client = resendClient()

        await client.sendEmail({
            from: ENV.APP_EMAIL_FROM,
            to: result.data.email,
            subject: 'Confirme seu email',
            react: SignupConfirmationHtml(signupConfirmationEmailProps),
            text: SignupConfirmationText(signupConfirmationEmailProps)
        })

        return result.data
    })

export type SignupResult = Awaited<ReturnType<typeof signup>>
