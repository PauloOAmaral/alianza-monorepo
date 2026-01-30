import { createMainDbClient } from '@alianza/database/clients/main'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { resetPassword as baseResetPassword } from '../../base'

const resetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(1)
})

export const resetPassword = createAction({ schema: resetPasswordSchema })
    .withData()
    .withRequest()
    .build(async ({ request, data }) => {
        const { token, password } = data

        const db = createMainDbClient()

        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        await baseResetPassword({
            data: {
                token,
                password,
                userAgent,
                ipAddress
            },
            dbClient: db
        })
    })

export type ResetPasswordResult = Awaited<ReturnType<typeof resetPassword>>
