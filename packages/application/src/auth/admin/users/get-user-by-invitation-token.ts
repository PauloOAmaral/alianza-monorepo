import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { getUserByInvitationToken as baseGetUserByInvitationToken } from "../../base"

const getUserByInvitationTokenSchema = z.object({
    token: z.string().min(1),
})

export const getUserByInvitationToken = createAction({ schema: getUserByInvitationTokenSchema })
    .withData()
    .build(async ({ data }) => {
        const { token } = data

        const db = createMainDbClient()

        const result = await baseGetUserByInvitationToken({ data: { token }, dbClient: db })

        return result.data
    })

export type GetUserByInvitationToken = Awaited<ReturnType<typeof getUserByInvitationToken>>
