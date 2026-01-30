import { foreignKey, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { countries } from './countries'

export const banks = pgTable(
    'banks',
    {
        id,
        name: varchar('name', { length: 200 }).notNull(),
        code: varchar('code', { length: 10 }).notNull(),
        countryId: varchar('country_id', { length: 16 }).notNull(),
        status: integer('status').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('banks__country_id_idx').on(table.countryId),
        foreignKey({
            columns: [table.countryId],
            foreignColumns: [countries.id],
            name: 'banks_fkey'
        })
    ]
)
