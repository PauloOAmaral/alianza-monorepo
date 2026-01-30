import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const studentTerms = pgTable(
    'student_terms',
    {
        id,
        title: varchar('title', { length: 100 }).notNull(),
        content: text('content').notNull(),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('student_terms_deleted_at_idx').on(table.deletedAt)]
)
