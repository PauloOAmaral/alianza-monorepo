import { eq } from '@alianza/database/drizzle'
import { userSessions } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const logoutSchema = z.object({
    sessionId: z.string().min(1)
})

export const logout = createAction({ schema: logoutSchema })
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

export type LogoutResult = Awaited<ReturnType<typeof logout>>['data']
