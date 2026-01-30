import { foreignKey, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { studentTeacherRequests } from './student-teacher-requests'
import { teacherAttributes } from './teacher-attributes'

export const studentTeacherRequestAttributes = pgTable(
    'student_teacher_request_attributes',
    {
        id,
        studentTeacherRequestId: varchar('student_teacher_request_id', { length: 16 }).notNull(),
        teacherAttributeId: varchar('teacher_attribute_id', { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('stra_deleted_at_idx').on(table.deletedAt),
        index('stra_str_id_idx').on(table.studentTeacherRequestId),
        index('stra_ta_id_idx').on(table.teacherAttributeId),
        foreignKey({
            columns: [table.studentTeacherRequestId],
            foreignColumns: [studentTeacherRequests.id],
            name: 'stra_str_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherAttributeId],
            foreignColumns: [teacherAttributes.id],
            name: 'stra_ta_id_fkey'
        })
    ]
)
