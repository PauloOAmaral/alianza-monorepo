import { foreignKey, index, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { materials } from './materials'
import { studentClassExperimentalFeedbacks } from './student-class-experimental-feedbacks'

export const materialWithExperimentalFeedbacks = pgTable(
    'material_with_experimental_feedbacks',
    {
        id,
        materialId: varchar('material_id', { length: 16 }).notNull(),
        studentClassExperimentalFeedbackId: varchar('student_class_experimental_feedback_id', {
            length: 16
        }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        uniqueIndex('mwef_material_scef_uk').on(table.materialId, table.studentClassExperimentalFeedbackId),
        index('mwef_deleted_at_idx').on(table.deletedAt),
        index('mwef_scef_id_idx').on(table.studentClassExperimentalFeedbackId),
        foreignKey({
            columns: [table.materialId],
            foreignColumns: [materials.id],
            name: 'mwef_material_id_fkey'
        }),
        foreignKey({
            columns: [table.studentClassExperimentalFeedbackId],
            foreignColumns: [studentClassExperimentalFeedbacks.id],
            name: 'mwef_scef_id_fkey'
        })
    ]
)
