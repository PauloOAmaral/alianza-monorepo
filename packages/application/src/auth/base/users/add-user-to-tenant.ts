import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { addUserContextCore } from '../_shared'

const addUserContextSchema = z.object({
    email: z.string().min(1),
    permissionGroupIds: z.array(z.string())
})

export const addUserContext = createAction({ schema: addUserContextSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ data, dbClient, dbTransaction }) => {
        const response = await addUserContextCore({ data, dbClient, dbTransaction })

        return response.data
    })

export type AddUserContextResult = Awaited<ReturnType<typeof addUserContext>>['data']
