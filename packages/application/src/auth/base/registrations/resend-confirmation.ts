import { and, eq, isNull } from '@alianza/database/drizzle'
import { userContexts, userProfiles, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const resendSignupConfirmationSchema = z.object({
    email: z.email()
})

export const resendSignupConfirmation = createAction({
    schema: resendSignupConfirmationSchema
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const [userContext] = await db
            .select({
                id: userContexts.id,
                userId: userContexts.userId,
                invitationExpiresAt: userContexts.invitationExpiresAt,
                invitationToken: userContexts.invitationToken,
                email: users.email,
                firstName: userProfiles.firstName,
                lastName: userProfiles.lastName
            })
            .from(userContexts)
            .innerJoin(users, eq(userContexts.userId, users.id))
            .innerJoin(userProfiles, eq(users.userProfileId, userProfiles.id))
            .where(and(isNull(userContexts.invitationConfirmedAt), eq(users.emailConfirmed, false), eq(users.email, email)))
            .limit(1)

        if (!userContext) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            email: userContext.email,
            firstName: userContext.firstName,
            lastName: userContext.lastName,
            token: userContext.invitationToken
        }
    })

export type ResendSignupConfirmationResult = Awaited<ReturnType<typeof resendSignupConfirmation>>['data']
