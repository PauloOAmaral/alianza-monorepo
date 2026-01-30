import { foreignKey, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { studentRequestTypes } from './student-request-types'
import { students } from './students'

export const studentRequests = pgTable(
    'student_requests',
    {
        id,
        studentId: varchar('student_id', { length: 16 }).notNull(),
        studentRequestTypeId: varchar('student_request_type_id', { length: 16 }).notNull(),
        status: integer('status').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_requests_deleted_at_idx').on(table.deletedAt),
        index('student_requests__student_id_idx').on(table.studentId),
        index('student_requests__student_request_type_id_idx').on(table.studentRequestTypeId),
        foreignKey({
            columns: [table.studentRequestTypeId],
            foreignColumns: [studentRequestTypes.id],
            name: 'student_requests__student_request_type_id_fkey'
        }),
        foreignKey({
            columns: [table.studentId],
            foreignColumns: [students.id],
            name: 'student_requests__student_id_fkey'
        })
    ]
)
