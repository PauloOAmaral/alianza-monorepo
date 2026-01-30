import { index, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { userTenants, userType } from '../common/auth'

export const studentClassEventTypes = pgEnum('student_class_event_types', ['student_class_event_type_1', 'student_class_event_type_2', 'student_class_event_type_3'])

export const studentClassEvents = pgTable(
    'student_class_events',
    {
        id,
        externalStudentClassId: varchar('external_student_class_id', { length: 36 }).notNull(),
        userType: userType('user_type').notNull(),
        event: studentClassEventTypes('event').notNull(),
        userTenantId: varchar('user_tenant_id', { length: 16 })
            .notNull()
            .references(() => userTenants.id),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('student_class_events_deleted_at_idx').on(table.deletedAt)]
)
