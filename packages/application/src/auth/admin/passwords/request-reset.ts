import { createMainDbClient } from '@alianza/database/clients/main'
import { PasswordResetHtml, type PasswordResetProps, PasswordResetText } from '@alianza/notifications/admin/templates'
import { resendClient } from '@alianza/services/email/resend'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { ENV } from '~/utils/env'
import { createAction } from '../../../action-builder'
import { requestPasswordReset as baseRequestPasswordReset } from '../../base'

const requestPasswordResetSchema = z.object({
    email: z.email()
})

export const requestPasswordReset = createAction({ schema: requestPasswordResetSchema })
    .withData()
    .withRequest()
    .build(async ({ request, data }) => {
        const { email } = data

        const db = createMainDbClient()

        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        const result = await baseRequestPasswordReset({
            data: { email, userAgent, ipAddress },
            dbClient: db
        })

        const passwordResetEmailProps: PasswordResetProps = {
            token: result.data.token
        }

        const client = resendClient()

        await client.sendEmail({
            from: ENV.APP_EMAIL_FROM,
            to: email,
            subject: 'Redefina sua senha',
            react: PasswordResetHtml(passwordResetEmailProps),
            text: PasswordResetText(passwordResetEmailProps)
        })
    })

export type RequestPasswordResetResult = Awaited<ReturnType<typeof requestPasswordReset>>
