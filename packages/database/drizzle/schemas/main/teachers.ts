import { boolean, char, foreignKey, index, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { bankAccounts } from './bank-accounts'
import { squads } from './squads'

export const teacherStatus = pgEnum('teacher_status', [
    'active', // Ativo = 0
    'inactive' // Inativo = 1
])

export const teachers = pgTable(
    'teachers',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        squadId: varchar('squad_id', { length: 16 }).notNull(),
        classLink: varchar('class_link', { length: 300 }),
        status: teacherStatus('status').notNull(),
        bankAccountId: varchar('bank_account_id', { length: 16 }),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teachers__bank_account_id_idx').on(table.bankAccountId),
        index('teachers_deleted_at_idx').on(table.deletedAt),
        index('teachers__squad_id_idx').on(table.squadId),
        foreignKey({
            columns: [table.bankAccountId],
            foreignColumns: [bankAccounts.id],
            name: 'teachers__bank_account_id_fkey'
        }),
        foreignKey({
            columns: [table.squadId],
            foreignColumns: [squads.id],
            name: 'teachers__squad_id_fkey'
        })
    ]
)
