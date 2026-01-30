import { foreignKey, index, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { studentClasses } from './student-classes'

export const studentClassMeetEvents = pgTable(
    'student_class_meet_events',
    {
        id,
        studentClassId: varchar('student_class_id', { length: 16 }).notNull(),
        userId: varchar('user_id', { length: 16 }).notNull(),
        userType: integer('user_type').notNull(),
        eventDate: timestamp('event_date', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        type: integer('type').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_class_meet_events_deleted_at_idx').on(table.deletedAt),
        index('student_class_meet_events__student_class_id_idx').on(table.studentClassId),
        foreignKey({
            columns: [table.studentClassId],
            foreignColumns: [studentClasses.id],
            name: 'student_class_meet_events_fkey'
        })
    ]
)
