import { type CreateBatchOptions, type CreateEmailOptions, Resend } from 'resend'
import { ENV } from '~/utils/env'

export function resendClient() {
    const resend = new Resend(ENV.RESEND_API_KEY)

    async function sendEmail(props: CreateEmailOptions) {
        await resend.emails.send(props)
    }

    async function sendBatchEmail(props: CreateBatchOptions) {
        await resend.batch.send(props)
    }

    return {
        sendEmail,
        sendBatchEmail
    }
}
