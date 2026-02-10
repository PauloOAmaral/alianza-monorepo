import { createMainDbClient } from '@alianza/database/clients/main'
import { createAction } from '../../../action-builder'

export const getPhoneCountriesQuery = createAction()
    .build(async () => {
        const db = createMainDbClient()

        const data = await db.query.countries.findMany({
            columns: {
                id: true,
                name: true,
                countryAlpha2Code: true,
                phoneCountryCode: true,
                isActive: true
            },
            where: (table, { and, isNull, eq }) => and(isNull(table.deletedAt), eq(table.isActive, true)),
            orderBy: (table, { asc }) => asc(table.name)
        })

        const countriesWithPhone = data.filter(country => Boolean(country.phoneCountryCode))

        return {
            countries: countriesWithPhone
        }
    })
