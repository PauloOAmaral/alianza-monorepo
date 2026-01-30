import { index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'

export const studentContractModels = pgTable(
    'student_contract_models',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        content: text('content').notNull(),
        status: integer('status').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('student_contract_models_deleted_at_idx').on(table.deletedAt)]
)
