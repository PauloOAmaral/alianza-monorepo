import { nanoid } from "@alianza/database/nanoid"
import { userSessions } from "@alianza/database/schemas/common"
import type { AuthDatabaseClient, AuthDatabaseTransaction } from "@alianza/database/types/common"
import { addSeconds } from "date-fns"
import { z } from "zod"
import { ENV } from "~/utils/env"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const createSessionSchema = z.object({
    userId: z.string().min(1),
    currentTenantId: z.string().min(1),
    expiresAt: z.date().optional().nullable(),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable(),
})

export const createSession = createAction({ schema: createSessionSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, currentTenantId, userAgent, ipAddress } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        const expiresAt = data.expiresAt || addSeconds(new Date(), Number(ENV.SESSION_EXPIRATION))
        const sessionId = nanoid(16)

        await db.insert(userSessions).values({
            id: sessionId,
            userId,
            currentTenantId,
            expiresAt,
            userAgent,
            ipAddress,
        })

        return {
            id: sessionId,
        }
    })

export type CreateSessionResult = Awaited<ReturnType<typeof createSession>>["data"]
