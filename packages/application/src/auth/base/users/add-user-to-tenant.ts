import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { addUserToTenantCore } from "../_shared"

const addUserToTenantSchema = z.object({
    email: z.string().min(1),
    tenantId: z.string().min(1),
    permissionGroupIds: z.array(z.string()),
})

export const addUserToTenant = createAction({ schema: addUserToTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const response = await addUserToTenantCore({ data, dbClient, dbTransaction })

        return response.data
    })

export type AddUserToTenantResult = Awaited<ReturnType<typeof addUserToTenant>>["data"]
