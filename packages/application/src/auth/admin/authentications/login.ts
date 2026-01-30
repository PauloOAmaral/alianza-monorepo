import { createMainDbClient } from '@alianza/database/clients/main'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { createSession as baseCreateSession, login as baseLogin } from '../../base'

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})

export const login = createAction({ schema: loginSchema })
    .withData()
    .withRequest()
    .build(async ({ data, request }) => {
        const { email, password } = data

        const db = createMainDbClient()

        const loginResult = await baseLogin({ data: { email, password }, dbClient: db })

        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        const session = await baseCreateSession({
            data: {
                userId: loginResult.data.userId,
                currentTenantId: loginResult.data.currentTenantId,
                userAgent,
                ipAddress
            },
            dbClient: db
        })

        return session.data
    })
