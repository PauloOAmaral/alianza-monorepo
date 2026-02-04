import { eq } from '@alianza/database/drizzle'
import { userContexts, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { isAfter } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const confirmSignupSchema = z.object({
    token: z.string().min(1)
})

export const confirmSignup = createAction({ schema: confirmSignupSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token } = data
        const db = dbClient || dbTransaction!

        const userContext = await db._query.userContexts.findFirst({
            columns: {
                id: true,
                userId: true,
                invitationExpiresAt: true,
                invitationToken: true
            },
            where: (userContexts, { and, eq, isNull, exists }) =>
                and(
                    eq(userContexts.invitationToken, token),
                    isNull(userContexts.invitationConfirmedAt),
                    exists(
                        db
                            .select()
                            .from(users)
                            .where(and(eq(users.id, userContexts.userId), eq(users.emailConfirmed, false)))
                    )
                )
        })

        if (!userContext) {
            throw new ApplicationError('authUserNotFound')
        }

        if (isAfter(new Date(), userContext.invitationExpiresAt!)) {
            throw new ApplicationError('authSignupConfirmationExpired')
        }

        await db
            .update(users)
            .set({
                emailConfirmed: true,
                emailConfirmedAt: new Date()
            })
            .where(eq(users.id, userContext.userId))

        const firstUserContext = await db._query.userContexts.findFirst({
            columns: {
                id: true
            },
            where: eq(userContexts.userId, userContext.userId)
        })

        if (!firstUserContext) {
            throw new ApplicationError('authUserHasNoContext')
        }

        return {
            userId: userContext.userId,
            currentContextId: firstUserContext.id
        }
    })

export type ConfirmSignupResult = Awaited<ReturnType<typeof confirmSignup>>['data']
