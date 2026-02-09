import { and, eq, inArray } from '@alianza/database/drizzle'
import { nanoid } from '@alianza/database/nanoid'
import { permissionGroups, userContextPermissionGroups } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const updateUserPermissionGroupsSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1),
    permissionGroupIds: z.array(z.string())
})

export const updateUserPermissionGroups = createAction({
    schema: updateUserPermissionGroupsSchema
})
    .withData()
    .withSession()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, session, dbClient, dbTransaction }) => {
        const { userId, userContextId, permissionGroupIds } = data
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        const userContext = await db.query.userContexts.findFirst({
            columns: {
                id: true,
                userId: true
            },
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

        if (!userContext) {
            throw new ApplicationError('commonNotFound')
        }

        if (userContext.userId === session.user.id) {
            throw new ApplicationError('authCannotChangeOwnPermissions')
        }

        const adminGroup = await db.query.permissionGroups.findFirst({
            columns: {
                id: true
            },
            where: (permissionGroups, { eq }) => eq(permissionGroups.name, 'Admin')
        })

        if (!adminGroup) {
            throw new ApplicationError('unexpectedError')
        }

        const finalPermissionGroupIds = permissionGroupIds.includes(adminGroup.id) ? [adminGroup.id] : permissionGroupIds

        const existingPermissionGroupsCount = await db.$count(permissionGroups, inArray(permissionGroups.id, finalPermissionGroupIds))

        if (existingPermissionGroupsCount !== finalPermissionGroupIds.length) {
            throw new ApplicationError('authInvalidPermissionGroups')
        }

        await db.transaction(async tx => {
            await tx.delete(userContextPermissionGroups).where(eq(userContextPermissionGroups.userContextId, userContext.id))

            await tx.insert(userContextPermissionGroups).values(
                finalPermissionGroupIds.map(permissionGroupId => ({
                    id: nanoid(16),
                    userContextId: userContext.id,
                    permissionGroupId
                }))
            )
        })
    })

export type UpdateUserPermissionGroupsResult = Awaited<ReturnType<typeof updateUserPermissionGroups>>['data']
