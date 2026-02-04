import { eq } from '@alianza/database/drizzle'
import { userContexts, userPasswordReset, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { isAfter } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { hashPassword } from '../../utils'

const resetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(1),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable()
})

export const resetPassword = createAction({ schema: resetPasswordSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token, password, userAgent, ipAddress } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const passwordReset = await db._query.userPasswordReset.findFirst({
            columns: {
                id: true,
                userContextId: true,
                expiresAt: true,
                usedAt: true
            },
            where: (userPasswordReset, { and, eq, isNull }) => and(eq(userPasswordReset.token, token), isNull(userPasswordReset.usedAt))
        })

        if (!passwordReset) {
            throw new ApplicationError('authPasswordResetNotFoundOrExpired')
        }

        if (isAfter(new Date(), passwordReset.expiresAt)) {
            throw new ApplicationError('authPasswordResetNotFoundOrExpired')
        }

        const userContext = await db._query.userContexts.findFirst({
            columns: { userId: true },
            with: {},
            where: (uc, { eq }) => eq(uc.id, passwordReset.userContextId)
        })

        if (!userContext) {
            throw new ApplicationError('authPasswordResetNotFoundOrExpired')
        }

        const userId = userContext.userId

        const resetPasswordWithTransaction = async (tx: AuthDatabaseTransaction) => {
            await tx
                .update(users)
                .set({
                    password: hashPassword(password)
                })
                .where(eq(users.id, userId))

            await tx
                .update(userPasswordReset)
                .set({
                    usedAt: new Date(),
                    userAgent,
                    ipAddress
                })
                .where(eq(userPasswordReset.id, passwordReset.id))
        }

        if (dbClient) {
            await dbClient.transaction(resetPasswordWithTransaction)
        } else {
            await resetPasswordWithTransaction(dbTransaction!)
        }
    })

export type ResetPasswordResult = Awaited<ReturnType<typeof resetPassword>>['data']
