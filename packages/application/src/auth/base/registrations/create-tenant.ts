import type { AuthDatabaseClient, AuthDatabaseTransaction } from '@alianza/database/types/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { getOrCreateDefaultPermissionGroup } from '../_shared'

const createTenantSchema = z.object({})

export const createTenant = createAction({ schema: createTenantSchema })
    .withData()
    .withDatabase<AuthDatabaseClient, AuthDatabaseTransaction>()
    .build(async ({ dbClient, dbTransaction }) => {
        const response = await getOrCreateDefaultPermissionGroup({ data: {}, dbClient, dbTransaction })

        return response.data
    })

export type CreateTenantResult = Awaited<ReturnType<typeof createTenant>>['data']
