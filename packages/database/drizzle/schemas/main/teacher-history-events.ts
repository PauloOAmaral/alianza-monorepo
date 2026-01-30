import { char, foreignKey, index, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { teachers } from './teachers'

export const teacherEventType = pgEnum('teacher_event_type', [
    'teacher_created', // Teacher cadastrado = 0
    'new_contract', // Novo contrato criado. = 1
    'class_reschedule', // Reagendou uma Aula. = 2
    'open_contract', // Abriu o contrato para assinatura. = 3
    'update_contract_data', // Atualizou Dados do contrato. = 4
    'sign_contract', // Assinou o contrato = 5
    'student_reject_class' // Aluno rejeitou a aula = 6
])

export const teacherHistoryEvents = pgTable(
    'teacher_history_events',
    {
        id,
        teacherId: varchar('teacher_id', { length: 16 }).notNull(),
        type: teacherEventType('type').notNull(),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        userName: varchar('user_name', { length: 200 }).notNull(),
        description: text('description'),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('teacher_history_events_deleted_at_idx').on(table.deletedAt),
        index('teacher_history_events__teacher_id_idx').on(table.teacherId),
        foreignKey({
            columns: [table.teacherId],
            foreignColumns: [teachers.id],
            name: 'teacher_history_events_fkey'
        })
    ]
)
