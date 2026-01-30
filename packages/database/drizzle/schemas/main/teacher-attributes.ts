import { boolean, index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const teacherAttributes = pgTable(
    'teacher_attributes',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        canSelect: boolean('can_select').default(true).notNull(),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('teacher_attributes_deleted_at_idx').on(table.deletedAt)]
)
