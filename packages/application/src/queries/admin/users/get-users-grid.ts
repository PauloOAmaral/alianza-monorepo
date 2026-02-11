import { createMainDbClient } from '@alianza/database/clients/main'
import { and, desc, isNull, sql } from '@alianza/database/drizzle'
import { users } from '@alianza/database/schemas/common'
import { z } from 'zod'
import { createAction } from '../../../action-builder'

const schema = z.object({
    query: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20)
})

export const getUsersGridQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { query, page, limit } = data
        const offset = (page - 1) * limit

        const db = createMainDbClient()

        const searchCondition = query ? sql`unaccent(${users.email}) ilike unaccent(${`%${query}%`})` : undefined

        const whereCondition = and(isNull(users.deletedAt), searchCondition)

        const dataQuery = db.query.users.findMany({
            columns: {
                id: true,
                email: true,
                emailConfirmed: true,
                createdAt: true
            },
            with: {
                userProfile: {
                    columns: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            where: whereCondition,
            orderBy: [desc(users.createdAt)],
            limit,
            offset
        })

        const countQuery = db.$count(users, whereCondition)

        const [result, count] = await Promise.all([dataQuery, countQuery])

        return { data: result, count }
    })

export type GetUsersGridQuery = Awaited<ReturnType<typeof getUsersGridQuery>>
