import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { confirmInvite as baseConfirmInvite } from "../../base"

const confirmInviteSchema = z.object({
    token: z.string().min(1),
    password: z.string().optional(),
})

export const confirmInvite = createAction({ schema: confirmInviteSchema })
    .withData()
    .build(async ({ data }) => {
        const { token, password } = data

        const db = createMainDbClient()

        const result = await baseConfirmInvite({
            data: { token, password },
            dbClient: db,
        })

        return result.data
    })

export type ConfirmInviteResult = Awaited<ReturnType<typeof confirmInvite>>
