import { createMainDbClient } from '@alianza/database/clients/main'
import { getSessionsKv } from '@alianza/services/kv'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { updateSessionContext as baseUpdateSessionContext } from '../../base'

const updateSessionContextSchema = z.object({
    sessionId: z.string().min(1),
    contextId: z.string().min(1)
})

export const updateSessionContext = createAction({ schema: updateSessionContextSchema })
    .withData()
    .build(async ({ data }) => {
        const { sessionId, contextId } = data

        const db = createMainDbClient()

        const result = await baseUpdateSessionContext({
            data: { sessionId, contextId },
            dbClient: db
        })

        await getSessionsKv().delete(sessionId)

        return result.data
    })
