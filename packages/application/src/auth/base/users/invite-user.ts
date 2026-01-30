import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"
import { addUserToTenant } from "./add-user-to-tenant"

const inviteUserSchema = z.object({
    email: z.string().min(1),
    tenantId: z.string().min(1),
    permissionGroupIds: z.array(z.string()),
})

export const inviteUser = createAction({ schema: inviteUserSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, tenantId, permissionGroupIds } = data

        const result = await addUserToTenant({
            data: {
                email,
                tenantId,
                permissionGroupIds,
            },
            dbClient,
            dbTransaction,
        })

        const createdUser = result.data

        if (!createdUser.userTenant.invitationToken) {
            throw new ApplicationError("unexpectedError")
        }

        return {
            token: createdUser.userTenant.invitationToken,
            tenantName: createdUser.userTenant.tenant.tenantProfile.name,
            email: createdUser.email,
            firstName: createdUser.userProfile.firstName,
            lastName: createdUser.userProfile.lastName,
        }
    })

export type InviteUserResult = Awaited<ReturnType<typeof inviteUser>>["data"]
