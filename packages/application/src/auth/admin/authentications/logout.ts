import { createMainDbClient } from '@alianza/database/clients/main'
import { getSessionsKv } from '@alianza/services/kv'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { deleteSession as baseDeleteSession } from '../../base'

const logoutSchema = z.object({
    sessionId: z.string().min(1)
})

export const logout = createAction({ schema: logoutSchema })
    .withData()
    .build(async ({ data }) => {
        const { sessionId } = data

        const db = createMainDbClient()

        await Promise.allSettled([
            baseDeleteSession({
                data: { sessionId },
                dbClient: db
            }),
            getSessionsKv().delete(sessionId)
        ])
    })
