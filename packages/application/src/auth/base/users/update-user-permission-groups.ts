import { and, eq, inArray } from "@alianza/database/drizzle"
import { nanoid } from "@alianza/database/nanoid"
import {
    permissionGroups,
    userTenantPermissionGroups,
} from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const updateUserPermissionGroupsSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1),
    permissionGroupIds: z.array(z.string()),
})

export const updateUserPermissionGroups = createAction({
    schema: updateUserPermissionGroupsSchema,
})
    .withData()
    .withSession()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, session, dbClient, dbTransaction }) => {
        const { userId, tenantId, permissionGroupIds } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const userTenant = await db._query.userTenants.findFirst({
            columns: {
                id: true,
                userId: true,
            },
            with: {
                permissionGroups: {
                    columns: {},
                    with: {
                        permissionGroup: {
                            columns: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            where: (userTenants, { and, eq }) =>
                and(eq(userTenants.userId, userId), eq(userTenants.tenantId, tenantId)),
        })

        if (!userTenant) {
            throw new ApplicationError("commonNotFound")
        }

        if (userTenant.userId === session.user.id) {
            throw new ApplicationError("authCannotChangeOwnPermissions")
        }

        const adminGroup = await db._query.permissionGroups.findFirst({
            columns: {
                id: true,
            },
            where: (permissionGroups, { eq }) => eq(permissionGroups.name, "Admin"),
        })

        if (!adminGroup) {
            throw new ApplicationError("unexpectedError")
        }

        const finalPermissionGroupIds = permissionGroupIds.includes(adminGroup.id)
            ? [adminGroup.id]
            : permissionGroupIds

        const existingPermissionGroupsCount = await db.$count(
            permissionGroups,
            and(
                inArray(permissionGroups.id, finalPermissionGroupIds),
                eq(permissionGroups.tenantId, tenantId),
            ),
        )

        if (existingPermissionGroupsCount !== finalPermissionGroupIds.length) {
            throw new ApplicationError("authInvalidPermissionGroups")
        }

        await db.transaction(async (tx) => {
            await tx
                .delete(userTenantPermissionGroups)
                .where(eq(userTenantPermissionGroups.userTenantId, userTenant.id))

            await tx.insert(userTenantPermissionGroups).values(
                finalPermissionGroupIds.map((permissionGroupId) => ({
                    id: nanoid(16),
                    userTenantId: userTenant.id,
                    permissionGroupId,
                })),
            )
        })
    })

export type UpdateUserPermissionGroupsResult = Awaited<
    ReturnType<typeof updateUserPermissionGroups>
>["data"]
