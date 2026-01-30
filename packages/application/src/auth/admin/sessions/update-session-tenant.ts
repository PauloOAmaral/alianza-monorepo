import { createMainDbClient } from '@alianza/database/clients/main'
import { getSessionsKv } from '@alianza/services/kv'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { updateSessionTenant as baseUpdateSessionTenant } from '../../base'

const updateSessionTenantSchema = z.object({
    sessionId: z.string().min(1),
    tenantId: z.string().min(1)
})

export const updateSessionTenant = createAction({ schema: updateSessionTenantSchema })
    .withData()
    .build(async ({ data }) => {
        const { sessionId, tenantId } = data

        const db = createMainDbClient()

        const result = await baseUpdateSessionTenant({
            data: { sessionId, tenantId },
            dbClient: db
        })

        await getSessionsKv().delete(sessionId)

        return result.data
    })
