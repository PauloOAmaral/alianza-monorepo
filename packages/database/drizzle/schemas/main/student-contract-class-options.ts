import { foreignKey, index, integer, pgTable, time, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { studentContracts } from './student-contracts'

export const studentContractClassOptions = pgTable(
    'student_contract_class_options',
    {
        id,
        studentContractId: varchar('student_contract_id', { length: 16 }).notNull(),
        dayOfWeek: integer('day_of_week').notNull(),
        desiredTime: time('desired_time').notNull(),
        duration: integer('duration'),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('student_contract_class_options_deleted_at_idx').on(table.deletedAt),
        index('student_contract_class_options__student_contract_id_idx').on(table.studentContractId),
        foreignKey({
            columns: [table.studentContractId],
            foreignColumns: [studentContracts.id],
            name: 'student_contract_class_options_fkey'
        })
    ]
)
