import { and, eq } from '@alianza/database/drizzle'
import { nanoid } from '@alianza/database/nanoid'
import { userContexts } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { addDays } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const resendUserInviteSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1)
})

export const resendUserInvite = createAction({ schema: resendUserInviteSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, userContextId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const userContext = await db.query.userContexts.findFirst({
            columns: {
                id: true
            },
            where: (userContexts, { and, eq }) => and(eq(userContexts.id, userContextId), eq(userContexts.userId, userId))
        })

        if (!userContext) {
            throw new ApplicationError('authUserNotFound')
        }

        await db
            .update(userContexts)
            .set({
                invitationToken: nanoid(32),
                invitationExpiresAt: addDays(new Date(), 7)
            })
            .where(and(eq(userContexts.id, userContextId), eq(userContexts.userId, userId)))

        const updatedUserContext = await db.query.userContexts.findFirst({
            columns: {
                id: true,
                invitationExpiresAt: true,
                invitationToken: true
            },
            with: {
                user: {
                    columns: {
                        id: true,
                        email: true
                    },
                    with: {
                        userProfile: {
                            columns: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            },
            where: (userContexts, { and, eq }) => and(eq(userContexts.id, userContextId), eq(userContexts.userId, userId))
        })

        if (!updatedUserContext || !updatedUserContext.invitationToken) {
            throw new ApplicationError('authUserNotFound')
        }

        return {
            invitationToken: updatedUserContext.invitationToken,
            userEmail: updatedUserContext.user.email,
            userFirstName: updatedUserContext.user.userProfile.firstName,
            userLastName: updatedUserContext.user.userProfile.lastName
        }
    })

export type ResendUserInviteResult = Awaited<ReturnType<typeof resendUserInvite>>['data']
