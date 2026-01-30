import { boolean, index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'

export const studentRequestTypes = pgTable(
    'student_request_types',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        description: text('description').notNull(),
        urgency: integer('urgency').notNull(),
        isFinancial: boolean('is_financial').notNull(),
        isInternal: boolean('is_internal').default(false).notNull(),
        status: integer('status').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('student_request_types_deleted_at_idx').on(table.deletedAt)]
)
