import { eq, isNull } from '@alianza/database/drizzle'
import { medias, userContextPermissionGroups, userContexts, userProfiles, userSessions, users } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { getSessionsKv } from '@alianza/services/kv'
import { getImagesBucket } from '@alianza/services/storage'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const deleteUnconfirmedUserContextSchema = z.object({
    id: z.string().min(1)
})

export const deleteUnconfirmedUserContext = createAction({ schema: deleteUnconfirmedUserContextSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { id } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const userContext = await db.query.userContexts.findFirst({
            columns: { id: true, userId: true },
            with: {
                user: {
                    columns: { id: true },
                    with: {
                        userProfile: {
                            columns: { id: true, avatarId: true }
                        },
                        userContexts: { columns: { id: true } }
                    }
                }
            },
            where: (uc, { and, eq }) => and(eq(uc.id, id), isNull(uc.invitationConfirmedAt))
        })

        if (!userContext) {
            throw new ApplicationError('commonNotFound')
        }

        await db.transaction(async tx => {
            await tx.delete(userContextPermissionGroups).where(eq(userContextPermissionGroups.userContextId, id))
            await tx.delete(userContexts).where(eq(userContexts.id, id))

            if (userContext.user.userContexts.length === 1) {
                if (userContext.user.userProfile.avatarId) {
                    await tx.delete(medias).where(eq(medias.id, userContext.user.userProfile.avatarId))
                }
                await tx.delete(userProfiles).where(eq(userProfiles.id, userContext.user.userProfile.id))
                await tx.delete(users).where(eq(users.id, userContext.user.id))
            }
        })

        const sessionsToInvalidate = await db.select({ id: userSessions.id }).from(userSessions).where(eq(userSessions.userContextId, id))
        await Promise.allSettled(sessionsToInvalidate.map(s => getSessionsKv().delete(s.id)))
    })

export type DeleteUnconfirmedUserContextResult = Awaited<ReturnType<typeof deleteUnconfirmedUserContext>>['data']
