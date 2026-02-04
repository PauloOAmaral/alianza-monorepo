import { foreignKey, index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teachers } from './teachers'

export const teacherCourses = pgTable(
    'teacher_courses',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        name: varchar('name', { length: 200 }).notNull(),
        institution: varchar('institution', { length: 200 }),
        completedAt: timestamp('completed_at', { withTimezone: true, mode: 'date' }),
        duration: varchar('duration', { length: 50 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_courses_deleted_at_idx').on(table.deletedAt),
        index('teacher_courses__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_courses__teacher_id_fkey'
        })
    ]
)
