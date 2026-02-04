import { createMainDbClient } from "@alianza/database/clients/main"
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

        const count = await db.$count(leads, { where: (leads, { isNull }) => isNull(leads.deletedAt) })

        return {
            data: leads,
            count,
        }
    })