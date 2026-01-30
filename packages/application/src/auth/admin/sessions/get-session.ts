import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { getCachedSession } from '../_shared'

const getSessionSchema = z.object({
    sessionId: z.string().min(1)
})

export const getSession = createAction({ schema: getSessionSchema })
    .withData()
    .build(async ({ data }) => {
        const { sessionId } = data

        const session = await getCachedSession({ data: { sessionId } })

        return session.data
    })

export type { UserSession } from '../_shared'
