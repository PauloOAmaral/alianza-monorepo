import { eq } from '@alianza/database/drizzle'
import { userSessions } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const updateSessionContextSchema = z.object({
    sessionId: z.string().min(1),
    contextId: z.string().min(1)
})

export const updateSessionContext = createAction({ schema: updateSessionContextSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { sessionId, contextId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        await db.update(userSessions).set({ currentContextId: contextId }).where(eq(userSessions.id, sessionId))
    })

export type UpdateSessionContextResult = Awaited<ReturnType<typeof updateSessionContext>>['data']
