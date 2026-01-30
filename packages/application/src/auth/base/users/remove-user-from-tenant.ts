import { eq } from "@alianza/database/drizzle"
import {
    medias,
    users,
    userTenantPermissionGroups,
    userTenants,
} from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { getSessionsKv } from "@alianza/services/kv"
import { getImagesBucket } from "@alianza/services/storage"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const removeUserFromTenantSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1),
})

export const removeUserFromTenant = createAction({ schema: removeUserFromTenantSchema })
    .withData()
    .withSession()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, session, dbClient, dbTransaction }) => {
        const { userId, tenantId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        if (session.user.id === userId) {
            throw new ApplicationError("authCannotRemoveYourself")
        }

        const userTenant = await db._query.userTenants.findFirst({
            columns: {
                id: true,
            },
            with: {
                user: {
                    columns: {
                        id: true,
                    },
                    with: {
                        userProfile: {
                            with: {
                                avatar: {
                                    columns: {
                                        id: true,
                                        path: true,
                                    },
                                },
                            },
                        },
                        userTenants: {
                            columns: {
                                id: true,
                            },
                        },
                        userSessions: {
                            columns: {
                                id: true,
                            },
                            where: (fields, { and, eq, gt }) =>
                                and(
                                    eq(fields.userId, userId),
                                    eq(fields.currentTenantId, tenantId),
                                    gt(fields.expiresAt, new Date()),
                                ),
                        },
                    },
                },
                tenant: {
                    columns: {
                        id: true,
                    },
                },
            },
            where: (userTenants, { and, eq }) =>
                and(eq(userTenants.userId, userId), eq(userTenants.tenantId, tenantId)),
        })

        if (!userTenant) {
            throw new ApplicationError("authUserNotFound")
        }

        await db.transaction(async (tx) => {
            await tx
                .delete(userTenantPermissionGroups)
                .where(eq(userTenantPermissionGroups.userTenantId, userTenant.id))

            await tx.delete(userTenants).where(eq(userTenants.id, userTenant.id))

            if (userTenant.user.userTenants.length === 1) {
                await tx.delete(users).where(eq(users.id, userTenant.user.id))
            }

            if (userTenant.user.userProfile.avatar) {
                await tx.delete(medias).where(eq(medias.id, userTenant.user.userProfile.avatar.id))
            }
        })

        if (userTenant.user.userProfile.avatar) {
            await getImagesBucket().remove(userTenant.user.userProfile.avatar.path)
        }

        if (userTenant.user.userSessions.length) {
            await Promise.allSettled(
                userTenant.user.userSessions.map((session) => getSessionsKv().delete(session.id)),
            )
        }
    })

export type RemoveUserFromTenantResult = Awaited<ReturnType<typeof removeUserFromTenant>>["data"]
