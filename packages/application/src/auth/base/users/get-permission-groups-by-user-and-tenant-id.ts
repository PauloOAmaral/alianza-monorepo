import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"

const getPermissionGroupsByUserAndTenantIdSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1),
})

export const getPermissionGroupsByUserAndTenantId = createAction({
    schema: getPermissionGroupsByUserAndTenantIdSchema,
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, tenantId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const result = await db._query.userTenants.findFirst({
            columns: {},
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

        return (
            result?.permissionGroups?.map((permissionGroup) => ({
                id: permissionGroup.permissionGroup.id,
                name: permissionGroup.permissionGroup.name,
            })) || []
        )
    })

export type GetPermissionGroupsByUserAndTenantIdResult = Awaited<
    ReturnType<typeof getPermissionGroupsByUserAndTenantId>
>["data"]
