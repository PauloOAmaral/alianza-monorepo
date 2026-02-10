import { createMainDbClient } from '@alianza/database/clients/main'
import { createAction } from '../../../action-builder'

export const getInternalCampaignOptionsQuery = createAction()
    .build(async () => {
        const db = createMainDbClient()

        const campaigns = await db.query.internalCampaigns.findMany({
            columns: {
                id: true,
                name: true,
                isActive: true
            },
            where: (table, { and, isNull, eq }) => and(isNull(table.deletedAt), eq(table.isActive, true)),
            orderBy: (table, { asc }) => asc(table.name)
        })

        return campaigns
    })
