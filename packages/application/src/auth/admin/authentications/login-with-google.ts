import { eq } from '@alianza/database/drizzle'
import { createMainDbClient } from '@alianza/database/clients/main'
import { users } from '@alianza/database/schemas/common'
import { getUserInformationFromRequest } from '@alianza/utils/headers'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { createSession as baseCreateSession } from '../../base/sessions/create-session'
import { createUserAndTenant } from '../../base/registrations/create-user-and-tenant'

const loginWithGoogleSchema = z.object({
    googleId: z.string().min(1),
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})

export const loginWithGoogle = createAction({ schema: loginWithGoogleSchema })
    .withData()
    .withRequest()
    .build(async ({ data, request }) => {
        const { googleId, email, firstName, lastName } = data
        const db = createMainDbClient()

        const { userAgent, ipAddress } = getUserInformationFromRequest(request.headers)

        let userId: string
        let currentContextId: string

        const existingByGoogleId = await db.query.users.findFirst({
            columns: { id: true },
            with: {
                userContexts: {
                    columns: { id: true },
                    where: (userContexts, { isNotNull }) => isNotNull(userContexts.invitationConfirmedAt),
                    orderBy: (userContexts, { asc }) => asc(userContexts.invitationConfirmedAt),
                    limit: 1
                }
            },
            where: (users, { eq }) => eq(users.googleId, googleId)
        })

        if (existingByGoogleId?.userContexts?.[0]) {
            userId = existingByGoogleId.id
            currentContextId = existingByGoogleId.userContexts[0].id
        } else {
            const existingByEmail = await db.query.users.findFirst({
                columns: { id: true },
                with: {
                    userContexts: {
                        columns: { id: true },
                        where: (userContexts, { isNotNull }) => isNotNull(userContexts.invitationConfirmedAt),
                        orderBy: (userContexts, { asc }) => asc(userContexts.invitationConfirmedAt),
                        limit: 1
                    }
                },
                where: (users, { eq }) => eq(users.email, email)
            })

            if (existingByEmail?.userContexts?.[0]) {
                await db.update(users).set({ googleId }).where(eq(users.id, existingByEmail.id))
                userId = existingByEmail.id
                currentContextId = existingByEmail.userContexts[0].id
            } else {
                const result = await createUserAndTenant({
                    data: {
                        user: {
                            email,
                            firstName,
                            lastName
                        }
                    },
                    dbClient: db
                })

                userId = result.data.user.id
                currentContextId = result.data.user.userContext.id

                await db.update(users).set({ googleId }).where(eq(users.id, userId))
            }
        }

        const session = await baseCreateSession({
            data: {
                userId,
                currentContextId,
                userAgent,
                ipAddress
            },
            dbClient: db
        })

        return session.data
    })

export type LoginWithGoogleResult = Awaited<ReturnType<typeof loginWithGoogle>>['data']
