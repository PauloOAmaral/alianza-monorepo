import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, isNull } from '@alianza/database/drizzle'
import { disciplines } from '@alianza/database/schemas/admin'
import { createAction } from '../../../action-builder'

export const getDisciplineOptionsQuery = createAction().build(async () => {
    const db = createMainDbClient()

    return await db.query.disciplines.findMany({
        columns: {
            id: true,
            name: true
        },
        where: and(isNull(disciplines.deletedAt), eq(disciplines.isActive, true)),
        orderBy: (table, { asc }) => asc(table.name)
    })
})

export type GetDisciplineOptionsQuery = Awaited<ReturnType<typeof getDisciplineOptionsQuery>>
