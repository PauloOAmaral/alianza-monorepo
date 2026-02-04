import { createMainDbClient } from '@alianza/database/clients/main'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { getPermissionGroupsByUserAndContextId as baseGetPermissionGroupsByUserAndContextId } from '../../base'

const getPermissionGroupsByUserAndContextIdSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1)
})

export const getPermissionGroupsByUserAndContextId = createAction({
    schema: getPermissionGroupsByUserAndContextIdSchema
})
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const result = await baseGetPermissionGroupsByUserAndContextId({
            data,
            dbClient: db
        })

        return result.data
    })

export type GetPermissionGroupsByUserAndContextId = Awaited<ReturnType<typeof getPermissionGroupsByUserAndContextId>>
