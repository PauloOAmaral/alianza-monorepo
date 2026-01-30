import { createMainDbClient } from '@alianza/database/clients/main'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { createSession as baseCreateSession } from '../../base'
import { getCachedSession } from '../_shared'

const createSessionSchema = z.object({
    userId: z.string().min(1),
    currentTenantId: z.string().min(1)
})

export const createSession = createAction({ schema: createSessionSchema })
    .withData()
    .withRequest()
    .build(async ({ request, data }) => {
        const { userId, currentTenantId } = data
        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        const db = createMainDbClient()

        const userSession = await baseCreateSession({
            data: { userId, currentTenantId, userAgent, ipAddress },
            dbClient: db
        })

        const session = await getCachedSession({
            data: { sessionId: userSession.data.id }
        })

        return session.data
    })
