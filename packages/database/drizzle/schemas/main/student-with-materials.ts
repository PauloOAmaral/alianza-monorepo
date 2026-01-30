import { foreignKey, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { materials } from './materials'
import { students } from './students'

export const studentWithMaterials = pgTable(
    'student_with_materials',
    {
        id,
        studentId: varchar('student_id', { length: 16 }).notNull(),
        materialId: varchar('material_id', { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_with_materials__material_id_idx').on(table.materialId),
        index('student_with_materials_deleted_at_idx').on(table.deletedAt),
        index('student_with_materials__student_id_idx').on(table.studentId),
        foreignKey({
            columns: [table.materialId],
            foreignColumns: [materials.id],
            name: 'student_with_materials__material_id_fkey'
        }),
        foreignKey({
            columns: [table.studentId],
            foreignColumns: [students.id],
            name: 'student_with_materials__student_id_fkey'
        })
    ]
)
