import { foreignKey, index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { studentTransferReasons } from './student-transfer-reasons'
import { students } from './students'
import { teachers } from './teachers'

export const teacherTransferHistories = pgTable(
    'teacher_transfer_histories',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        studentId: varchar('student_id', { length: 16 }).notNull(),
        studentTransferReasonId: varchar('student_transfer_reason_id', { length: 16 }).notNull(),
        description: varchar('description', { length: 500 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_transfer_histories_deleted_at_idx').on(table.deletedAt),
        index('teacher_transfer_histories__student_id_idx').on(table.studentId),
        index('teacher_transfer_histories__student_transfer_reason_id_idx').on(table.studentTransferReasonId),
        index('teacher_transfer_histories__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.studentId],
            foreignColumns: [students.id],
            name: 'teacher_transfer_histories__student_id_fkey'
        }),
        foreignKey({
            columns: [table.studentTransferReasonId],
            foreignColumns: [studentTransferReasons.id],
            name: 'teacher_transfer_histories__student_transfer_reason_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_transfer_histories__teacher_id_fkey'
        })
    ]
)
