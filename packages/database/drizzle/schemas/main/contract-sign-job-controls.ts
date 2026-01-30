import { foreignKey, index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'
import { studentContracts } from './student-contracts'
import { teacherContracts } from './teacher-contracts'

export const contractSignJobControls = pgTable(
    'contract_sign_job_controls',
    {
        id,
        studentContractId: varchar('student_contract_id', { length: 16 }),
        teacherContractId: varchar('teacher_contract_id', { length: 16 }),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('contract_sign_job_controls__student_contract_id_idx').on(table.studentContractId),
        index('contract_sign_job_controls__teacher_contract_id_idx').on(table.teacherContractId),
        foreignKey({
            columns: [table.studentContractId],
            foreignColumns: [studentContracts.id],
            name: 'contract_sign_job_controls__student_contract_id_fkey'
        }),
        foreignKey({
            columns: [table.teacherContractId],
            foreignColumns: [teacherContracts.id],
            name: 'contract_sign_job_controls__teacher_contract_id_fkey'
        })
    ]
)
