import { and, eq, isNull } from '@alianza/database/drizzle'
import { userProfiles, users, userTenants } from '@alianza/database/schemas/common'
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

        const [userTenant] = await db
            .select({
                id: userTenants.id,
                userId: userTenants.userId,
                invitationExpiresAt: userTenants.invitationExpiresAt,
                invitationToken: userTenants.invitationToken,
                email: users.email,
                firstName: userProfiles.firstName,
                lastName: userProfiles.lastName
            })
            .from(userTenants)
            .innerJoin(users, eq(userTenants.userId, users.id))
            .innerJoin(userProfiles, eq(users.id, userProfiles.id))
            .where(and(isNull(userTenants.invitationConfirmedAt), eq(users.emailConfirmed, false), eq(users.email, email)))
            .limit(1)

        if (!userTenant) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            email: userTenant.email,
            firstName: userTenant.firstName,
            lastName: userTenant.lastName,
            token: userTenant.invitationToken
        }
    })

export type ResendSignupConfirmationResult = Awaited<ReturnType<typeof resendSignupConfirmation>>['data']
