import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, isNull } from '@alianza/database/drizzle'
import { teachers } from '@alianza/database/schemas/admin'
import { createAction } from '../../../action-builder'

export const getActiveTeacherOptionsQuery = createAction().build(async () => {
    const db = createMainDbClient()

    return await db.query.teachers.findMany({
        columns: {
            id: true,
            name: true
        },
        where: and(isNull(teachers.deletedAt), eq(teachers.status, 'active')),
        orderBy: (table, { asc }) => asc(table.name)
    })
})

export type GetActiveTeacherOptionsQuery = Awaited<ReturnType<typeof getActiveTeacherOptionsQuery>>
