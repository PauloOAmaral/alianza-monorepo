import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const getPermissionGroupsByUserAndContextIdSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1)
})

export const getPermissionGroupsByUserAndContextId = createAction({
    schema: getPermissionGroupsByUserAndContextIdSchema
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const { userId, userContextId } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const result = await db._query.userContexts.findFirst({
            columns: {},
            with: {
                userContextPermissionGroups: {
                    columns: {},
                    with: {
                        permissionGroup: {
                            columns: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            where: (userContexts, { and, eq }) => and(eq(userContexts.userId, userId), eq(userContexts.id, userContextId))
        })

        return (
            result?.userContextPermissionGroups?.map(ucpg => ({
                id: ucpg.permissionGroup.id,
                name: ucpg.permissionGroup.name
            })) || []
        )
    })

export type GetPermissionGroupsByUserAndContextIdResult = Awaited<ReturnType<typeof getPermissionGroupsByUserAndContextId>>['data']
