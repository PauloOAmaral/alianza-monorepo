import { createMainDbClient } from '@alianza/database/clients/main'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { removeUserFromContext as baseRemoveUserFromContext } from '../../base'

const removeUserFromContextSchema = z.object({
    userId: z.string().min(1),
    userContextId: z.string().min(1)
})

export const removeUserFromContext = createAction({ schema: removeUserFromContextSchema })
    .withData()
    .withSession()
    .build(async ({ data, session }) => {
        const db = createMainDbClient()

        const result = await baseRemoveUserFromContext({
            data,
            session,
            dbClient: db
        })

        return result?.data
    })

export type RemoveUserFromContextResult = Awaited<ReturnType<typeof removeUserFromContext>>
