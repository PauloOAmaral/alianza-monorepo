import { foreignKey, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentContracts } from "./student-contracts"
import { teacherContracts } from "./teacher-contracts"

export const contractTokens = pgTable(
	"contract_tokens",
	{
		id,
		token: varchar("token", { length: 100 }).notNull(),
		studentContractId: varchar("student_contract_id", { length: 16 }),
		teacherContractId: varchar("teacher_contract_id", { length: 16 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		uniqueIndex("contract_tokens__student_contract_id_key").on(table.studentContractId),
		uniqueIndex("contract_tokens__teacher_contract_id_key").on(table.teacherContractId),
		foreignKey({
			columns: [table.studentContractId],
			foreignColumns: [studentContracts.id],
			name: "contract_tokens__student_contract_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherContractId],
			foreignColumns: [teacherContracts.id],
			name: "contract_tokens__teacher_contract_id_fkey",
		}),
	],
)
