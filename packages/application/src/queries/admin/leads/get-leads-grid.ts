import { createMainDbClient } from "@alianza/database/clients/main"
import { isNull, sql } from "@alianza/database/drizzle"
import { leads as leadsTable } from "@alianza/database/schemas/admin"
import z from "zod"
import { createAction } from "~/action-builder"

const getLeadsGridSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20),
})

export const getLeadsGridQuery = createAction({ schema: getLeadsGridSchema })
    .withData()
    .build(async ({ data }) => {
        const { page, limit } = data

        const db = createMainDbClient()

        const leads = await db._query.leads.findMany({
            columns: {
                id: true,
                name: true,
                email: true
            },
            where: (leads, { isNull, and }) => and(isNull(leads.deletedAt)),
            orderBy: (leads, { desc }) => desc(leads.createdAt),
            limit,
            offset: (page - 1) * limit,
        })

        const countRows = await db
            .select({ count: sql<number>`count(*)` })
            .from(leadsTable)
            .where(isNull(leadsTable.deletedAt))

        const count = countRows[0]?.count ?? 0

        return {
            data: leads,
            count,
        }
    })
