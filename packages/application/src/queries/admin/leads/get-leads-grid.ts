import { createMainDbClient } from '@alianza/database/clients/main'
import { and, isNull, or, sql } from '@alianza/database/drizzle'
import { leads } from '@alianza/database/schemas/admin'
import z from 'zod'
import { createAction } from '~/action-builder'

const getLeadsGridSchema = z.object({
    query: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20)
})

export const getLeadsGridQuery = createAction({ schema: getLeadsGridSchema })
    .withData()
    .build(async ({ data }) => {
        const { query, page, limit } = data

        const offset = (page - 1) * limit

        const db = createMainDbClient()

        const searchCondition = query ? or(sql`unaccent(${leads.name}) ilike unaccent(${`%${query}%`})`) : undefined

        const whereCondition = and(isNull(leads.deletedAt), searchCondition)

        const dataQuery = db.query.leads.findMany({
            columns: {
                id: true,
                name: true,
                email: true,
                primaryPhoneCountryCode: true,
                primaryPhoneNumber: true,
                status: true
            },
            with: {
                seller: {
                    with: {
                        userContext: {
                            with: {
                                user: {
                                    with: {
                                        userProfile: {
                                            extras(fields) {
                                                return {
                                                    fullName: sql<string>`
                                                        CONCAT(${fields.firstName}, ' ', ${fields.lastName})
                                                    `.as('fullName')
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                discipline: {
                    columns: {
                        name: true
                    }
                }
            },
            where: whereCondition,
            limit,
            offset,
            orderBy: (leads, { desc }) => desc(leads.createdAt)
        })

        const countQuery = db.$count(leads, whereCondition)

        const [result, count] = await Promise.all([dataQuery, countQuery])

        return { data: result, count }
    })
