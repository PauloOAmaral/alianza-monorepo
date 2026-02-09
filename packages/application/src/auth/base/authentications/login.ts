import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { checkRateLimit, recordAttempt, resetRateLimit } from '@alianza/services/rate-limit'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { comparePasswords } from '../../utils'

const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

export const login = createAction({ schema: loginSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, password } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const rateLimitCheck = await checkRateLimit('login', email)

        if (!rateLimitCheck.allowed) {
            throw new ApplicationError('authTooManyAttempts')
        }

        const user = await db.query.users.findFirst({
            columns: {
                id: true,
                password: true,
                emailConfirmed: true
            },
            with: {
                userContexts: {
                    columns: {
                        id: true,
                        invitationConfirmedAt: true
                    },
                    where: (userContexts, { isNotNull }) => isNotNull(userContexts.invitationConfirmedAt),
                    orderBy(userContexts, { asc }) {
                        return asc(userContexts.invitationConfirmedAt)
                    },
                    limit: 1
                }
            },
            where: (users, { eq }) => eq(users.email, email)
        })

        if (!user || !user.password) {
            await recordAttempt('login', email)

            throw new ApplicationError('authUserNotFound')
        }

        if (!user.emailConfirmed) {
            throw new ApplicationError('authEmailNotVerified')
        }

        if (!comparePasswords(password, user.password)) {
            await recordAttempt('login', email)

            throw new ApplicationError('authInvalidPassword')
        }

        const firstUserContext = user.userContexts[0]

        if (!firstUserContext) {
            throw new ApplicationError('authUserHasNoContext')
        }

        await resetRateLimit('login', email)

        return {
            userId: user.id,
            currentContextId: firstUserContext.id
        }
    })

export type LoginResult = Awaited<ReturnType<typeof login>>['data']
