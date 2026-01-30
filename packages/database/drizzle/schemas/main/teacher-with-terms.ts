import { boolean, foreignKey, index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teacherTerms } from './teacher-terms'
import { teachers } from './teachers'

export const teacherWithTerms = pgTable(
    'teacher_with_terms',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        teacherTermId: varchar('teacher_term_id', { length: 16 }).notNull(),
        isAccept: boolean('is_accept').notNull(),
        token: varchar('token', { length: 100 }).notNull(),
        acceptAt: timestamp('accept_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_with_terms_deleted_at_idx').on(table.deletedAt),
        index('teacher_with_terms__teacher_id_idx').on(table.teacherId),
        index('teacher_with_terms__teacher_term_id_idx').on(table.teacherTermId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_with_terms__teacher_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherTermId],
            foreignColumns: [teacherTerms.id],
            name: 'teacher_with_terms__teacher_term_id_fkey'
        })
    ]
)
