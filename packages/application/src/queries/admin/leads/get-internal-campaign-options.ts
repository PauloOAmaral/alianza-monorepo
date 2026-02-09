import { createMainDbClient } from '@alianza/database/clients/main'
import { internalCampaigns } from '@alianza/database/schemas/admin'
import z from 'zod'
import { createAction } from '../../../action-builder'

const getInternalCampaignOptionsSchema = z.object({
    includeInactive: z.boolean().optional().default(false)
})

export const getInternalCampaignOptionsQuery = createAction({ schema: getInternalCampaignOptionsSchema })
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const campaigns = await db._query.internalCampaigns.findMany({
            columns: {
                id: true,
                name: true
            },
            where: (table, { and, isNull, eq }) => {
                const base = and(isNull(table.deletedAt))

                if (data.includeInactive) {
                    return base
                }

                return and(base, eq(table.isActive, true))
            },
            orderBy: (table, { asc }) => asc(table.name)
        })

        return {
            campaigns
        }
    })
