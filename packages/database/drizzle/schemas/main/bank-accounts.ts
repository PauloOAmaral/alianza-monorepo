import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'

export const bankAccounts = pgTable('bank_accounts', {
    id,
    accountType: integer('account_type').notNull(),
    agency: varchar('agency', { length: 20 }).notNull(),
    number: varchar('number', { length: 30 }).notNull(),
    holderName: varchar('holder_name', { length: 200 }).notNull(),
    vatNumber: varchar('vat_number', { length: 40 }),
    status: integer('status').notNull(),
    createdAt,
    updatedAt,
    deletedAt
})
