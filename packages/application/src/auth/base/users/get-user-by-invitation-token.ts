import { sql } from '@alianza/database/drizzle'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'
import { isSSO } from '../../utils'

const getUserByInvitationTokenSchema = z.object({
    token: z.string().min(1)
})

export const getUserByInvitationToken = createAction({
    schema: getUserByInvitationTokenSchema
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { token } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const result = await db._query.userTenants.findFirst({
            columns: {},
            extras(fields) {
                return {
                    isInvitationAccepted: sql<boolean>`${fields.invitationConfirmedAt} IS NOT NULL`.as('isInvitationAccepted'),
                    isInvitationExpired: sql<boolean>`${fields.invitationExpiresAt} < CURRENT_TIMESTAMP`.as('isInvitationExpired')
                }
            },
            with: {
                user: {
                    columns: {
                        id: true,
                        email: true,
                        emailConfirmed: true
                    }
                },
                tenant: {
                    columns: {},
                    with: {
                        tenantSamlProviders: {
                            columns: {
                                domain: true
                            }
                        }
                    }
                }
            },
            where(fields, { eq }) {
                return eq(fields.invitationToken, token)
            }
        })

        if (!result) {
            throw new ApplicationError('commonNotFound')
        }

        return {
            id: result.user.id,
            email: result.user.email,
            isEmailConfirmed: result.user.emailConfirmed,
            isInvitationAccepted: result.isInvitationAccepted,
            isInvitationExpired: result.isInvitationExpired,
            isSSO: isSSO(result.user.email, result.tenant.tenantSamlProviders)
        }
    })

export type GetUserByInvitationTokenResult = Awaited<ReturnType<typeof getUserByInvitationToken>>['data']
