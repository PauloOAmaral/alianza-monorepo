import { and, eq } from "@alianza/database/drizzle"
import { nanoid } from "@alianza/database/nanoid"
import {
    tenants,
    userProfiles,
    users,
    userTenantPermissionGroups,
    userTenants,
} from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { addDays } from "date-fns"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const addUserToTenantCoreSchema = z.object({
    email: z.string().min(1),
    tenantId: z.string().min(1),
    permissionGroupIds: z.array(z.string()),
})

export const addUserToTenantCore = createAction({ schema: addUserToTenantCoreSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, tenantId, permissionGroupIds } = data

        const addUserToTenantCoreTransaction = async (transaction: AuthDatabaseTransaction) => {
            const existingTenant = await transaction._query.tenants.findFirst({
                columns: {
                    id: true,
                },
                with: {
                    tenantProfile: {
                        columns: {
                            name: true,
                        },
                    },
                },
                where: eq(tenants.id, tenantId),
            })

            if (!existingTenant) {
                throw new ApplicationError("authTenantNotFound")
            }

            const existingUser = await transaction._query.users.findFirst({
                columns: {
                    id: true,
                    email: true,
                },
                with: {
                    userProfile: {
                        columns: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                where: eq(users.email, email),
            })

            if (!existingUser) {
                const userProfileId = nanoid(16)
                const [createdUserProfile] = await transaction
                    .insert(userProfiles)
                    .values({ id: userProfileId })
                    .returning({
                        id: userProfiles.id,
                        firstName: userProfiles.firstName,
                        lastName: userProfiles.lastName,
                    })

                if (!createdUserProfile) {
                    throw new ApplicationError("unexpectedError")
                }

                const userId = nanoid(16)
                const [createdUser] = await transaction
                    .insert(users)
                    .values({
                        id: userId,
                        email,
                        userProfileId: createdUserProfile.id,
                    })
                    .returning({
                        id: users.id,
                        email: users.email,
                    })

                if (!createdUser) {
                    throw new ApplicationError("unexpectedError")
                }

                const userTenantId = nanoid(16)
                const [createdUserTenant] = await transaction
                    .insert(userTenants)
                    .values({
                        id: userTenantId,
                        userId: createdUser.id,
                        tenantId,
                        invitationToken: nanoid(32),
                        invitationExpiresAt: addDays(new Date(), 7),
                    })
                    .returning({
                        id: userTenants.id,
                        invitationToken: userTenants.invitationToken,
                    })

                if (!createdUserTenant) {
                    throw new ApplicationError("unexpectedError")
                }

                await transaction.insert(userTenantPermissionGroups).values(
                    permissionGroupIds.map((permissionGroupId) => ({
                        id: nanoid(16),
                        userTenantId: createdUserTenant.id,
                        permissionGroupId,
                    })),
                )

                return {
                    id: createdUser.id,
                    email: createdUser.email,
                    userProfile: createdUserProfile,
                    userTenant: {
                        ...createdUserTenant,
                        tenant: existingTenant,
                    },
                }
            }

            const existingUserTenant = await transaction._query.userTenants.findFirst({
                columns: {
                    id: true,
                },
                where: and(
                    eq(userTenants.tenantId, tenantId),
                    eq(userTenants.userId, existingUser.id),
                ),
            })

            if (existingUserTenant) {
                throw new ApplicationError("authUserAlreadyExistsWithinTenant")
            }

            const userTenantId = nanoid(16)
            const [createdUserTenant] = await transaction
                .insert(userTenants)
                .values({
                    id: userTenantId,
                    userId: existingUser.id,
                    tenantId,
                    invitationToken: nanoid(32),
                    invitationExpiresAt: addDays(new Date(), 7),
                })
                .returning({
                    id: userTenants.id,
                    invitationToken: userTenants.invitationToken,
                })

            if (!createdUserTenant) {
                throw new ApplicationError("unexpectedError")
            }

            await transaction.insert(userTenantPermissionGroups).values(
                permissionGroupIds.map((permissionGroupId) => ({
                    id: nanoid(16),
                    userTenantId: createdUserTenant.id,
                    permissionGroupId,
                })),
            )

            return {
                id: existingUser.id,
                email: existingUser.email,
                userProfile: existingUser.userProfile,
                userTenant: {
                    ...createdUserTenant,
                    tenant: existingTenant,
                },
            }
        }

        if (dbClient) {
            return await dbClient.transaction(addUserToTenantCoreTransaction)
        }

        return await addUserToTenantCoreTransaction(dbTransaction!)
    })

export type AddUserToTenantResult = Awaited<ReturnType<typeof addUserToTenantCore>>["data"]
