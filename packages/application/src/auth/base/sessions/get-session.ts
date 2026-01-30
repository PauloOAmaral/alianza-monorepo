import { and, eq, gt, sql } from '@alianza/database/drizzle'
import { userSessions } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { addSeconds } from 'date-fns'
import { z } from 'zod'
import { createAction } from '~/action-builder'
import { shouldRefreshSession } from '~/auth/utils'
import { ApplicationError } from '~/error'
import { ENV } from '~/utils/env'

async function getUserSessionQuery(db: AuthDatabaseClient, sessionId: string) {
    return db._query.userSessions.findFirst({
        columns: {
            id: true,
            userTenantId: true,
            currentTenantId: true,
            userAgent: true,
            ipAddress: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true
        },
        with: {
            user: {
                columns: {
                    id: true,
                    email: true
                },
                with: {
                    userProfile: {
                        columns: {
                            firstName: true,
                            lastName: true
                        },
                        extras(fields) {
                            return {
                                fullName: sql<string>`
                                    CONCAT(${fields.firstName}, ' ', ${fields.lastName})
                                `.as('fullName')
                            }
                        },
                        with: {
                            avatar: {
                                columns: { path: true },
                                extras(fields) {
                                    return {
                                        url: sql<string>`
                                            CASE
                                              WHEN ${fields.type} LIKE 'image/%'
                                              THEN CONCAT('${sql.raw(ENV.CDN_BASE_URL)}','/width=160,height=160,quality=80/', ${fields.path})
                                              ELSE NULL
                                            END
                                        `.as('url')
                                    }
                                }
                            }
                        }
                    },
                    userTenantSamlProviders: {
                        columns: {
                            id: true
                        }
                    },
                    userTenants: {
                        columns: {
                            id: true,
                            tenantId: true
                        }
                    }
                }
            },
            currentTenant: {
                columns: {
                    id: true
                },
                with: {
                    tenantProfile: {
                        columns: {
                            name: true,
                            legalName: true
                        }
                    }
                }
            }
        },
        where: and(eq(userSessions.id, sessionId), gt(userSessions.expiresAt, new Date()))
    })
}
const getSessionSchema = z.object({
    sessionId: z.string().min(1)
})

export const getSession = createAction({ schema: getSessionSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { sessionId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        let session = await getUserSessionQuery(db, sessionId)

        if (!session) {
            throw new ApplicationError('commonNotFound')
        }

        if (shouldRefreshSession(session.expiresAt)) {
            const expiresAt = addSeconds(new Date(), Number(ENV.SESSION_EXPIRATION))

            await db.update(userSessions).set({ expiresAt }).where(eq(userSessions.id, sessionId))

            session = await getUserSessionQuery(db, sessionId)

            if (!session) {
                throw new ApplicationError('commonNotFound')
            }
        }

        return {
            id: session.id,
            userTenantId: session.userTenantId,
            userAgent: session.userAgent,
            ipAddress: session.ipAddress,
            expiresAt: session.expiresAt,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            user: {
                id: session.user.id,
                email: session.user.email,
                firstName: session.user.userProfile.firstName,
                lastName: session.user.userProfile.lastName,
                fullName: session.user.userProfile.fullName,
                avatar: session.user.userProfile.avatar,
                isSsoLogin: session.user.userTenantSamlProviders.length > 0
            },
            currentTenant: {
                id: session.currentTenant.id,
                name: session.currentTenant.tenantProfile.name,
                legalName: session.currentTenant.tenantProfile.legalName
            }
        }
    })

export type BaseUserSession = Awaited<ReturnType<typeof getSession>>['data']
