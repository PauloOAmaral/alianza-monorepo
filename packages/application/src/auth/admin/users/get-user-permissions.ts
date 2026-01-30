import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { getPermissionGroupsByUserAndTenantId as baseGetPermissionGroupsByUserAndTenantId } from "../../base"

const getPermissionGroupsByUserAndTenantIdSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1),
})

export const getPermissionGroupsByUserAndTenantId = createAction({
    schema: getPermissionGroupsByUserAndTenantIdSchema,
})
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const result = await baseGetPermissionGroupsByUserAndTenantId({
            data,
            dbClient: db,
        })

        return result.data
    })

export type GetPermissionGroupsByUserAndTenantId = Awaited<
    ReturnType<typeof getPermissionGroupsByUserAndTenantId>
>
