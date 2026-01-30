import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { changePassword as baseChangePassword } from "../../base"

const changePasswordSchema = z.object({
    userId: z.string().min(1),
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1),
})

export const changePassword = createAction({ schema: changePasswordSchema })
    .withData()
    .build(async ({ data }) => {
        const { userId, currentPassword, newPassword } = data

        const db = createMainDbClient()

        const result = await baseChangePassword({
            data: { userId, currentPassword, newPassword },
            dbClient: db,
        })

        return result.data
    })

export type ChangePasswordResult = Awaited<ReturnType<typeof changePassword>>
