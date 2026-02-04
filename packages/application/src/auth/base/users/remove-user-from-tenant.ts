import { eq } from '@alianza/database/drizzle'
import { medias, users, userContextPermissionGroups, userContexts } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { getSessionsKv } from '@alianza/services/kv'
import { getImagesBucket } from '@alianza/services/storage'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const removeUserFromContextSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1)
})

export const removeUserFromContext = createAction({ schema: removeUserFromContextSchema })
    .withData()
    .withSession()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, session, dbClient, dbTransaction }) => {
        const { userId, userContextId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        if (session.user.id === userId) {
            throw new ApplicationError('authCannotRemoveYourself')
        }

        const userContextRow = await db._query.userContexts.findFirst({
            columns: { id: true },
            where: (uc, { and, eq }) => and(eq(uc.userId, userId), eq(uc.id, userContextId))
        })

        if (!userContextRow) {
            throw new ApplicationError('authUserNotFound')
        }

        const userContext = await db._query.userContexts.findFirst({
            columns: { id: true },
            with: {
                user: {
                    columns: { id: true },
                    with: {
                        userProfile: {
                            with: {
                                avatar: {
                                    columns: {
                                        id: true,
                                        path: true
                                    }
                                }
                            }
                        },
                        userContexts: {
                            columns: { id: true }
                        }
                    }
                },
                userSessions: {
                    columns: { id: true },
                    where: (fields, { gt }) => gt(fields.expiresAt, new Date())
                }
            },
            where: (uc, { eq }) => eq(uc.id, userContextRow.id)
        })

        if (!userContext) {
            throw new ApplicationError('authUserNotFound')
        }

        await db.transaction(async tx => {
            await tx
                .delete(userContextPermissionGroups)
                .where(eq(userContextPermissionGroups.userContextId, userContext.id))

            await tx.delete(userContexts).where(eq(userContexts.id, userContext.id))

            if (userContext.user.userContexts.length === 1) {
                await tx.delete(users).where(eq(users.id, userContext.user.id))
            }

            if (userContext.user.userProfile.avatar) {
                await tx.delete(medias).where(eq(medias.id, userContext.user.userProfile.avatar.id))
            }
        })

        if (userContext.user.userProfile.avatar) {
            await getImagesBucket().remove(userContext.user.userProfile.avatar.path)
        }

        if (userContext.userSessions.length) {
            await Promise.allSettled(userContext.userSessions.map(s => getSessionsKv().delete(s.id)))
        }
    })

export type RemoveUserFromContextResult = Awaited<ReturnType<typeof removeUserFromContext>>['data']
