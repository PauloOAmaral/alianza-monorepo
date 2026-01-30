import { nanoid } from '@alianza/database/nanoid'
import { userPasswordReset } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { checkRateLimit, recordAttempt } from '@alianza/services/rate-limit'
import { normalizeIpAddress } from '@alianza/utils/ip'
import { addHours } from 'date-fns'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const requestPasswordResetSchema = z.object({
    email: z.email(),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable()
})

export const requestPasswordReset = createAction({ schema: requestPasswordResetSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { email, userAgent, ipAddress } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const emailRateLimit = await checkRateLimit('password-reset', email)

        if (!emailRateLimit.allowed) {
            throw new ApplicationError('authTooManyPasswordResetRequests')
        }

        const normalizedIp = normalizeIpAddress(ipAddress)

        if (normalizedIp) {
            const ipRateLimit = await checkRateLimit('password-reset-ip', normalizedIp)

            if (!ipRateLimit.allowed) {
                throw new ApplicationError('authTooManyPasswordResetRequests')
            }
        }

        const user = await db._query.users.findFirst({
            columns: {
                id: true,
                email: true
            },
            with: {
                userProfile: {
                    columns: {
                        firstName: true,
                        lastName: true
                    }
                },
                userTenantSamlProviders: {
                    columns: {
                        id: true
                    }
                }
            },
            where: (users, { eq }) => eq(users.email, email)
        })

        if (!user) {
            await recordAttempt('password-reset', email)

            if (normalizedIp) {
                await recordAttempt('password-reset-ip', normalizedIp)
            }

            throw new ApplicationError('authUserNotFound')
        }

        if (user.userTenantSamlProviders.length) {
            await recordAttempt('password-reset', email)

            if (normalizedIp) {
                await recordAttempt('password-reset-ip', normalizedIp)
            }

            throw new ApplicationError('authDomainConfiguredForSaml')
        }

        await recordAttempt('password-reset', email)

        if (normalizedIp) {
            await recordAttempt('password-reset-ip', normalizedIp)
        }

        const [passwordReset] = await db
            .insert(userPasswordReset)
            .values({
                id: nanoid(16),
                userId: user.id,
                token: nanoid(32),
                expiresAt: addHours(new Date(), 24),
                userAgent,
                ipAddress
            })
            .returning({
                id: userPasswordReset.id,
                token: userPasswordReset.token
            })

        if (!passwordReset || !passwordReset.token) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            email: user.email,
            token: passwordReset.token
        }
    })

export type RequestPasswordResetResult = Awaited<ReturnType<typeof requestPasswordReset>>['data']
