import { createMainDbClient } from '@alianza/database/clients/main'
import { and, eq, isNull } from '@alianza/database/drizzle'
import { countries } from '@alianza/database/schemas/admin'
import { createAction } from '../../../action-builder'

export const getCountryOptionsQuery = createAction().build(async () => {
    const db = createMainDbClient()

    return await db.query.countries.findMany({
        columns: {
            id: true,
            name: true,
            countryAlpha2Code: true,
            phoneCountryCode: true
        },
        where: and(isNull(countries.deletedAt), eq(countries.isActive, true)),
        orderBy: (table, { asc }) => asc(table.name)
    })
})

export type GetCountryOptionsQuery = Awaited<ReturnType<typeof getCountryOptionsQuery>>
