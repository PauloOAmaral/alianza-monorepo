import { eq } from '@alianza/database/drizzle'
import { userSessions } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const deleteSessionSchema = z.object({
    sessionId: z.string().min(1)
})

export const deleteSession = createAction({ schema: deleteSessionSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { sessionId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        await db.delete(userSessions).where(eq(userSessions.id, sessionId))
    })

export type DeleteSessionResult = Awaited<ReturnType<typeof deleteSession>>['data']
