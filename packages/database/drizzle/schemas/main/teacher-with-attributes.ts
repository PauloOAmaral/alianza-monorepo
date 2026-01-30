import { foreignKey, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teacherAttributes } from './teacher-attributes'
import { teachers } from './teachers'

export const teacherWithAttributes = pgTable(
    'teacher_with_attributes',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        teacherAttributeId: varchar('teacher_attribute_id', { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_with_attributes_deleted_at_idx').on(table.deletedAt),
        index('teacher_with_attributes__teacher_attribute_id_idx').on(table.teacherAttributeId),
        index('teacher_with_attributes__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherAttributeId],
            foreignColumns: [teacherAttributes.id],
            name: 'teacher_with_attributes__teacher_attribute_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_with_attributes__teacher_id_fkey'
        })
    ]
)
