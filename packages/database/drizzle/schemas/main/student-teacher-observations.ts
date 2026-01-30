import { foreignKey, index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { students } from './students'
import { teachers } from './teachers'

export const studentTeacherObservations = pgTable(
    'student_teacher_observations',
    {
        id,
        studentId: varchar('student_id', { length: 16 }).notNull(),
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        description: text('description').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_teacher_observations_deleted_at_idx').on(table.deletedAt),
        index('student_teacher_observations__student_id_idx').on(table.studentId),
        index('student_teacher_observations__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.studentId],
            foreignColumns: [students.id],
            name: 'student_teacher_observations__student_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'student_teacher_observations__teacher_id_fkey'
        })
    ]
)
