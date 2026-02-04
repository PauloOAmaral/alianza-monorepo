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
            userContextId: true,
            currentContextId: true,
            userAgent: true,
            ipAddress: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true
        },
        with: {
            userContext: {
                columns: {
                    id: true
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
                            }
                        }
                    }
                }
            },
            currentContext: {
                columns: {
                    id: true
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
            userContextId: session.userContextId,
            userAgent: session.userAgent,
            ipAddress: session.ipAddress,
            expiresAt: session.expiresAt,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            user: {
                id: session.userContext.user.id,
                email: session.userContext.user.email,
                firstName: session.userContext.user.userProfile.firstName,
                lastName: session.userContext.user.userProfile.lastName,
                fullName: session.userContext.user.userProfile.fullName,
                avatar: session.userContext.user.userProfile.avatar,
                isSsoLogin: false
            },
            currentContext: {
                id: session.currentContext.id
            }
        }
    })

export type BaseUserSession = Awaited<ReturnType<typeof getSession>>['data']
