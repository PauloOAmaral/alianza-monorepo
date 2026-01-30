import { boolean, foreignKey, index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'
import { teachers } from './teachers'

export const materials = pgTable(
    'materials',
    {
        id,
        name: varchar('name', { length: 200 }).notNull(),
        description: text('description').notNull(),
        fileName: varchar('file_name', { length: 250 }).notNull(),
        bucketName: varchar('bucket_name', { length: 100 }).notNull(),
        contentType: varchar('content_type', { length: 100 }).notNull(),
        isSchool: boolean('is_school').notNull(),
        length: varchar('length', { length: 100 }).notNull(),
        link: text('link'),
        teacherId: varchar('teacher_id', { length: 16 }),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('materials_deleted_at_idx').on(table.deletedAt),
        index('materials__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'materials_fkey'
        })
    ]
)
