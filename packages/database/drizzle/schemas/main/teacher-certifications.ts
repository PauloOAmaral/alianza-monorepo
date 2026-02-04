import { foreignKey, index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teachers } from './teachers'

export const teacherCertifications = pgTable(
    'teacher_certifications',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        name: varchar('name', { length: 200 }).notNull(),
        issuingOrganization: varchar('issuing_organization', { length: 200 }),
        issuedAt: timestamp('issued_at', { withTimezone: true, mode: 'date' }),
        credentialId: varchar('credential_id', { length: 100 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_certifications_deleted_at_idx').on(table.deletedAt),
        index('teacher_certifications__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_certifications__teacher_id_fkey'
        })
    ]
)
