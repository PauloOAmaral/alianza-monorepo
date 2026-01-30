import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { updateUserPermissionGroups as baseUpdateUserPermissionGroups } from "../../base"

const updateUserPermissionGroupsSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1),
    permissionGroupIds: z.array(z.string()),
})

export const updateUserPermissionGroups = createAction({ schema: updateUserPermissionGroupsSchema })
    .withData()
    .withSession()
    .build(async ({ data, session }) => {
        const db = createMainDbClient()

        const result = await baseUpdateUserPermissionGroups({
            data,
            session,
            dbClient: db,
        })

        return result.data
    })

export type UpdateUserPermissionGroupsResult = Awaited<
    ReturnType<typeof updateUserPermissionGroups>
>
