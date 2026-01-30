import { foreignKey, index, integer, pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { level as levelEnum } from '../common'
import { leads } from './leads'
import { studentClasses } from './student-classes'
import { studentProfessions } from './student-professions'
import { studentSpecificConditions } from './student-specific-conditions'

export const requerimentLevel = pgEnum('requeriment_level', [
    'low', // Baixo = 0
    'medium', // Médio = 1
    'high' // Alto = 2
])

export const studyReason = pgEnum('study_reason', [
    'work', // Trabalho = 0
    'travel', // Viagem = 1
    'apprenticeship', // Aprendizado = 2
    'other' // Outros = 3
])

export const studentClassExperimentalFeedbacks = pgTable(
    'student_class_experimental_feedbacks',
    {
        id,
        studentClassId: varchar('student_class_id', { length: 16 }),
        leadId: varchar('lead_id', { length: 16 }),
        level: levelEnum('level').notNull(),
        rating: integer('rating'),
        description: varchar('description', { length: 500 }).notNull(),
        requerimentLevel: requerimentLevel('requeriment_level'),
        reason: studyReason('reason').notNull(),
        studentSpecificConditionId: varchar('student_specific_condition_id', { length: 16 }),
        studentProfessionId: varchar('student_profession_id', { length: 16 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        uniqueIndex('scef_lead_id_key').on(table.leadId),
        index('scef_deleted_at_idx').on(table.deletedAt),
        uniqueIndex('scef_student_class_id_key').on(table.studentClassId),
        index('scef_student_profession_id_idx').on(table.studentProfessionId),
        index('scef_ssc_id_idx').on(table.studentSpecificConditionId),
        foreignKey({
            columns: [table.leadId],
            foreignColumns: [leads.id],
            name: 'scef_lead_id_fkey'
        }),
        foreignKey({
            columns: [table.studentClassId],
            foreignColumns: [studentClasses.id],
            name: 'scef_student_class_id_fkey'
        }),
        foreignKey({
            columns: [table.studentProfessionId],
            foreignColumns: [studentProfessions.id],
            name: 'scef_student_profession_id_fkey'
        }),
        foreignKey({
            columns: [table.studentSpecificConditionId],
            foreignColumns: [studentSpecificConditions.id],
            name: 'scef_ssc_id_fkey'
        })
    ]
)
