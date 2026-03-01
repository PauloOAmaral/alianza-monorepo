import { createMainDbClient } from '@alianza/database/clients/main'
import { and, desc, isNull, sql } from '@alianza/database/drizzle'
import { collectors } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'

const schema = z.object({
    query: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20)
})

export const getCollectorsGridQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { query, page, limit } = data
        const offset = (page - 1) * limit

        const db = createMainDbClient()

        const searchCondition = query ? sql`unaccent(${collectors.userAdminId}) ilike unaccent(${`%${query}%`})` : undefined

        const whereCondition = and(isNull(collectors.deletedAt), searchCondition)

        const dataQuery = db.query.collectors.findMany({
            columns: {
                id: true,
                userAdminId: true,
                dailyToCharge: true,
                isActive: true,
                createdAt: true
            },
            where: whereCondition,
            orderBy: [desc(collectors.createdAt)],
            limit,
            offset
        })

        const countQuery = db.$count(collectors, whereCondition)

        const [result, count] = await Promise.all([dataQuery, countQuery])

        return { data: result, count }
    })

export type GetCollectorsGridQuery = Awaited<ReturnType<typeof getCollectorsGridQuery>>
