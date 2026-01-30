import { createMainDbClient } from '@alianza/database/clients/main'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { validatePasswordResetToken as baseValidatePasswordResetToken } from '../../base'

const validatePasswordResetTokenSchema = z.object({
    token: z.string().min(1)
})

export const validatePasswordResetToken = createAction({ schema: validatePasswordResetTokenSchema })
    .withData()
    .build(async ({ data }) => {
        const { token } = data

        const db = createMainDbClient()

        const result = await baseValidatePasswordResetToken({ data: { token }, dbClient: db })

        return result.data
    })

export type ValidatePasswordResetTokenResult = Awaited<ReturnType<typeof validatePasswordResetToken>>
