import { createMainDbClient } from '@alianza/database/clients/main'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { removeUserFromTenant as baseRemoveUserFromTenant } from '../../base'

const removeUserFromTenantSchema = z.object({
    userId: z.string().min(1),
    tenantId: z.string().min(1)
})

export const removeUserFromTenant = createAction({ schema: removeUserFromTenantSchema })
    .withData()
    .withSession()
    .build(async ({ data, session }) => {
        const db = createMainDbClient()

        const result = await baseRemoveUserFromTenant({
            data,
            session,
            dbClient: db
        })

        return result.data
    })

export type RemoveUserFromTenantResult = Awaited<ReturnType<typeof removeUserFromTenant>>
