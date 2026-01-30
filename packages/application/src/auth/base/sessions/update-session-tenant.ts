import { eq } from "@alianza/database/drizzle"
import { userSessions } from "@alianza/database/schemas/common"
import type {
    AuthDatabaseClient,
    AuthDatabaseTransaction,
} from "@alianza/database/types/common"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const updateSessionTenantSchema = z.object({
    sessionId: z.string().min(1),
    tenantId: z.string().min(1),
})

export const updateSessionTenant = createAction({ schema: updateSessionTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { sessionId, tenantId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError("databaseNotFound")
        }

        await db
            .update(userSessions)
            .set({ currentTenantId: tenantId })
            .where(eq(userSessions.id, sessionId))
    })

export type UpdateSessionTenantResult = Awaited<ReturnType<typeof updateSessionTenant>>["data"]
