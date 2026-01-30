import { and, eq, exists, isNotNull, not, notExists, or } from '@alianza/database/drizzle'
import { addresses, medias, tenantProfiles, tenants, userProfiles, users, userTenants } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { getSessionsKv } from '@alianza/services/kv'
import { getImagesBucket } from '@alianza/services/storage'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const deleteUnconfirmedTenantSchema = z.object({
    id: z.string().min(1)
})

export const deleteUnconfirmedTenant = createAction({ schema: deleteUnconfirmedTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { id } = data

        const deleteTenantTransaction = async (transaction: AuthDatabaseTransaction) => {
            // Find tenant that has no confirmed user tenants
            const [tenantToBeDeleted] = await transaction
                .select({
                    id: tenants.id,
                    tenantProfileId: tenants.tenantProfileId,
                    tenantProfile: {
                        avatarId: tenantProfiles.avatarId,
                        addressId: tenantProfiles.addressId
                    }
                })
                .from(tenants)
                .leftJoin(tenantProfiles, eq(tenants.tenantProfileId, tenantProfiles.id))
                .where(
                    and(
                        eq(tenants.id, id),
                        or(
                            // has no confirmed user tenants
                            notExists(
                                transaction
                                    .select({ id: userTenants.id })
                                    .from(userTenants)
                                    .where(and(eq(userTenants.tenantId, tenants.id), isNotNull(userTenants.invitationConfirmedAt)))
                            )
                        )
                    )
                )
                .limit(1)

            if (!tenantToBeDeleted) {
                throw new ApplicationError('unexpectedError')
            }

            // select all users that are only associated with this tenant and not to any other tenant
            const usersToDelete = await transaction
                .select({
                    id: users.id,
                    userProfileId: users.userProfileId,
                    userProfile: {
                        avatarId: userProfiles.avatarId,
                        addressId: userProfiles.addressId
                    }
                })
                .from(users)
                .leftJoin(userProfiles, eq(users.userProfileId, userProfiles.id))
                .where(
                    and(
                        // user is associated with this tenant
                        exists(
                            transaction
                                .select({ id: userTenants.id })
                                .from(userTenants)
                                .where(and(eq(userTenants.userId, users.id), eq(userTenants.tenantId, id)))
                        ),
                        // user is NOT associated with any other tenant
                        notExists(
                            transaction
                                .select({ id: userTenants.id })
                                .from(userTenants)
                                .where(and(eq(userTenants.userId, users.id), not(eq(userTenants.tenantId, id))))
                        )
                    )
                )

            const actions: Promise<any>[] = [transaction.delete(tenants).where(eq(tenants.id, id))]

            if (tenantToBeDeleted.tenantProfileId) {
                actions.push(transaction.delete(tenantProfiles).where(eq(tenantProfiles.id, tenantToBeDeleted.tenantProfileId)))
            }

            if (tenantToBeDeleted.tenantProfile?.avatarId) {
                actions.push(transaction.delete(medias).where(eq(medias.id, tenantToBeDeleted.tenantProfile.avatarId)))
            }

            if (tenantToBeDeleted.tenantProfile?.addressId) {
                actions.push(transaction.delete(addresses).where(eq(addresses.id, tenantToBeDeleted.tenantProfile.addressId)))
            }

            for (const user of usersToDelete) {
                actions.push(transaction.delete(users).where(eq(users.id, user.id)))

                if (user.userProfileId) {
                    actions.push(transaction.delete(userProfiles).where(eq(userProfiles.id, user.userProfileId)))
                }

                if (user.userProfile?.avatarId) {
                    actions.push(transaction.delete(medias).where(eq(medias.id, user.userProfile.avatarId)))
                }

                if (user.userProfile?.addressId) {
                    actions.push(transaction.delete(addresses).where(eq(addresses.id, user.userProfile.addressId)))
                }
            }

            await Promise.all(actions)

            return {
                tenant: {
                    id: tenantToBeDeleted.id,
                    avatarId: tenantToBeDeleted.tenantProfile?.avatarId
                },
                users: usersToDelete.map(user => ({
                    id: user.id,
                    userAvatarId: user.userProfile?.avatarId
                }))
            }
        }

        let result: Awaited<ReturnType<typeof deleteTenantTransaction>> | null = null

        if (dbClient) {
            result = await dbClient.transaction(deleteTenantTransaction)
        } else {
            if (!dbTransaction) {
                throw new ApplicationError('databaseNotFound')
            }

            result = await deleteTenantTransaction(dbTransaction)
        }

        if (result) {
            const actions: (Promise<void> | void)[] = []

            // tenant related actions
            if (result.tenant.avatarId) {
                actions.push(getImagesBucket().remove(result.tenant.avatarId))
            }

            // user related actions
            for (const user of result.users) {
                actions.push(getSessionsKv().delete(user.id))

                if (user.userAvatarId) {
                    actions.push(getImagesBucket().remove(user.userAvatarId))
                }
            }

            await Promise.allSettled(actions)
        }
    })

export type DeleteUnconfirmedTenantResult = Awaited<ReturnType<typeof deleteUnconfirmedTenant>>['data']
