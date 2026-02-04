import { eq } from '@alianza/database/drizzle'
import { nanoid } from '@alianza/database/nanoid'
import { permissionGroups, permissionGroupsPermissions } from '@alianza/database/schemas/common'
import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const getOrCreateDefaultPermissionGroupSchema = z.object({})

export const getOrCreateDefaultPermissionGroup = createAction({
    schema: getOrCreateDefaultPermissionGroupSchema
})
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ dbClient, dbTransaction }) => {
        const db = dbClient || dbTransaction

        if (!db) {
            throw new ApplicationError('databaseNotFound')
        }

        let adminGroup = await db._query.permissionGroups.findFirst({
            columns: { id: true, name: true },
            where: eq(permissionGroups.name, 'Admin')
        })

        if (!adminGroup) {
            const permissionGroupId = nanoid(16)
            const [created] = await db
                .insert(permissionGroups)
                .values({ id: permissionGroupId, name: 'Admin' })
                .returning({ id: permissionGroups.id, name: permissionGroups.name })

            if (!created) {
                throw new ApplicationError('unexpectedError')
            }

            await db.insert(permissionGroupsPermissions).values({
                id: nanoid(16),
                permissionGroupId: created.id,
                permission: 'full'
            })

            adminGroup = created
        }

        return { permissionGroup: adminGroup }
    })

export type GetOrCreateDefaultPermissionGroupResult = Awaited<
    ReturnType<typeof getOrCreateDefaultPermissionGroup>
>['data']
