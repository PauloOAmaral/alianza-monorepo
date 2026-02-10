import { createMainDbClient } from '@alianza/database/clients/main'
import { and, desc, isNull, or, sql } from '@alianza/database/drizzle'
import { sellers } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'

const schema = z.object({
    query: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20)
})

export const getSellersGridQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { query, page, limit } = data
        const offset = (page - 1) * limit

        const db = createMainDbClient()

        const searchCondition = query
            ? or(
                  sql`unaccent(${sellers.referralCode}) ilike unaccent(${`%${query}%`})`,
                  sql`unaccent(${sellers.leadPrefix}) ilike unaccent(${`%${query}%`})`
              )
            : undefined

        const whereCondition = and(isNull(sellers.deletedAt), searchCondition)

        const dataQuery = db.query.sellers.findMany({
            columns: {
                id: true,
                userContextId: true,
                referralCode: true,
                leadPrefix: true,
                isActive: true,
                createdAt: true
            },
            with: {
                userContext: {
                    with: {
                        user: {
                            with: {
                                userProfile: {
                                    columns: {
                                        firstName: true,
                                        lastName: true
                                    },
                                    extras(fields) {
                                        return {
                                            fullName: sql<string>`
                                                CONCAT(COALESCE(${fields.firstName}, ''), ' ', COALESCE(${fields.lastName}, ''))
                                            `.as('fullName')
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: whereCondition,
            orderBy: [desc(sellers.createdAt)],
            limit,
            offset
        })

        const countQuery = db.$count(sellers, whereCondition)

        const [result, count] = await Promise.all([dataQuery, countQuery])

        return { data: result, count }
    })

export type GetSellersGridQuery = Awaited<ReturnType<typeof getSellersGridQuery>>
