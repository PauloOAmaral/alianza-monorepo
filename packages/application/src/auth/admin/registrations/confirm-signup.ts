import { createMainDbClient } from '@alianza/database/clients/main'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { confirmSignup as baseConfirmSignup, createSession as baseCreateSession } from '../../base'
import { getCachedSession } from '../_shared'

const confirmSignupSchema = z.object({
    token: z.string().min(1)
})

export const confirmSignup = createAction({ schema: confirmSignupSchema })
    .withData()
    .withRequest()
    .build(async ({ data, request }) => {
        const { token } = data

        const db = createMainDbClient()

        const result = await baseConfirmSignup({
            data: { token },
            dbClient: db
        })

        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        const userSession = await baseCreateSession({
            data: {
                userId: result.data.userId,
                currentTenantId: result.data.currentTenantId,
                userAgent,
                ipAddress
            },
            dbClient: db
        })

        const session = await getCachedSession({
            data: { sessionId: userSession.data.id }
        })

        return session.data
    })

export type ConfirmSignupResult = Awaited<ReturnType<typeof confirmSignup>>
