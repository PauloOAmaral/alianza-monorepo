import { and, eq } from '@alianza/database/drizzle'
import { nanoid } from '@alianza/database/nanoid'
import { userTenants } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { addDays } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const resendUserInviteSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1)
})

export const resendUserInvite = createAction({ schema: resendUserInviteSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, tenantId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const userTenant = await db._query.userTenants.findFirst({
            columns: {
                id: true
            },
            where: (userTenants, { and, eq }) => and(eq(userTenants.tenantId, tenantId), eq(userTenants.userId, userId))
        })

        if (!userTenant) {
            throw new ApplicationError('authUserNotFound')
        }

        await db
            .update(userTenants)
            .set({
                invitationToken: nanoid(32),
                invitationExpiresAt: addDays(new Date(), 7)
            })
            .where(and(eq(userTenants.tenantId, tenantId), eq(userTenants.userId, userId)))

        const updatedUserTenant = await db._query.userTenants.findFirst({
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
                },
                tenant: {
                    columns: {},
                    with: {
                        tenantProfile: {
                            columns: {
                                name: true
                            }
                        }
                    }
                }
            },
            where: (userTenants, { and, eq }) => and(eq(userTenants.tenantId, tenantId), eq(userTenants.userId, userId))
        })

        if (!updatedUserTenant || !updatedUserTenant.invitationToken) {
            throw new ApplicationError('authUserNotFound')
        }

        return {
            invitationToken: updatedUserTenant.invitationToken,
            tenantName: updatedUserTenant.tenant.tenantProfile.name,
            userEmail: updatedUserTenant.user.email,
            userFirstName: updatedUserTenant.user.userProfile.firstName,
            userLastName: updatedUserTenant.user.userProfile.lastName
        }
    })

export type ResendUserInviteResult = Awaited<ReturnType<typeof resendUserInvite>>['data']
