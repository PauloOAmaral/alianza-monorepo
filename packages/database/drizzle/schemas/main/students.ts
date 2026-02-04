import { char, foreignKey, index, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { collectors } from './collectors'
import { financialResponsibles } from './financial-responsibles'

export const studentStatus = pgEnum('student_status', ['active', 'inactive', 'blocked'])

export const students = pgTable(
    'students',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        status: studentStatus('status').notNull(),
        collectorId: varchar('collector_id', { length: 16 }),
        financialResponsibleId: varchar('financial_responsible_id', { length: 16 }),
        companyId: varchar('company_id', { length: 16 }),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('students__collector_id_idx').on(table.collectorId),
        index('students__company_id_idx').on(table.companyId),
        index('students__financial_responsible_id_idx').on(table.financialResponsibleId),
        index('students_deleted_at_idx').on(table.deletedAt),
        foreignKey({
            columns: [table.collectorId],
            foreignColumns: [collectors.id],
            name: 'students__collector_id_fkey'
        }),
        foreignKey({
            columns: [table.financialResponsibleId],
            foreignColumns: [financialResponsibles.id],
            name: 'students__financial_responsible_id_fkey'
        })
    ]
)
