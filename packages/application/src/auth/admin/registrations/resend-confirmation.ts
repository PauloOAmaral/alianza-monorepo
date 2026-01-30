import { createMainDbClient } from "@alianza/database/clients/main"
import {
    SignupConfirmationHtml,
    type SignupConfirmationProps,
    SignupConfirmationText,
} from "@alianza/notifications/admin/templates"
import { resendClient } from "@alianza/services/email/resend"
import { z } from "zod"
import { createAction } from "~/action-builder"
import { resendSignupConfirmation as baseResendSignupConfirmation } from "~/auth/base"
import { ENV } from "~/utils/env"

const resendSignupConfirmationSchema = z.object({
    email: z.email(),
})

export const resendSignupConfirmation = createAction({ schema: resendSignupConfirmationSchema })
    .withData()
    .build(async ({ data }) => {
        const { email } = data

        const db = createMainDbClient()

        const result = await baseResendSignupConfirmation({
            data: { email },
            dbClient: db,
        })

        const signupConfirmationEmailProps: SignupConfirmationProps = {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            token: result.data.token,
        }

        const client = resendClient()

        await client.sendEmail({
            from: ENV.APP_EMAIL_FROM,
            to: email,
            subject: "Confirme seu email",
            react: SignupConfirmationHtml(signupConfirmationEmailProps),
            text: SignupConfirmationText(signupConfirmationEmailProps),
        })
    })

export type ResendSignupConfirmationResult = Awaited<ReturnType<typeof resendSignupConfirmation>>
