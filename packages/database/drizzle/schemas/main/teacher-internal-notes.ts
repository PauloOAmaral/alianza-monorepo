import { foreignKey, index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teachers } from './teachers'

export const teacherInternalNotes = pgTable(
    'teacher_internal_notes',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        message: text('message').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_internal_notes_deleted_at_idx').on(table.deletedAt),
        index('teacher_internal_notes__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_internal_notes_fkey'
        })
    ]
)
