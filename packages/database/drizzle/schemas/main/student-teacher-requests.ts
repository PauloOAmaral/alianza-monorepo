import { boolean, foreignKey, index, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentContracts } from "./student-contracts"
import { students } from "./students"
import { teachers } from "./teachers"

export const studentTeacherRequestStatus = pgEnum("student_teacher_request_status", [
	"awaiting", // Aguardando = 0
	"requested", // Solicitada = 1
	"accepted", // Aceita = 2
	"refused", // Rejeitada = 3
	"expired", // Expirado = 4
])

export const studentTeacherRequestType = pgEnum("student_teacher_request_type", [
	"new_student", // Novo Aluno = 0
	"transfer", // Transferência = 1
	"new_contract", // Alteração de contrato = 2
	"reallocation", // Realocação = 3 (C#: Rellocation)
	"pause_return", // Retorno de Pausa = 4
	"cancel_return", // Reversão de Cancelamento = 5
	"pause_return_automatic", // Retorno de Pausa Automatizada = 6
	"hibernation_return", // Reversão de Hibernação = 7
])

export const studentTeacherRequests = pgTable(
	"student_teacher_requests",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		teacherId: varchar("teacher_id", { length: 16 }),
		studentContractId: varchar("student_contract_id", { length: 16 }).notNull(),
		status: studentTeacherRequestStatus("status").notNull(),
		type: studentTeacherRequestType("type").notNull(),
		isManual: boolean("is_manual").notNull(),
		firstInvoicePaid: boolean("first_invoice_paid").notNull(),
		allocationQuantity: integer("allocation_quantity").default(0).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_teacher_requests_deleted_at_idx").on(table.deletedAt),
		index("student_teacher_requests__student_contract_id_idx").on(table.studentContractId),
		index("student_teacher_requests__student_id_idx").on(table.studentId),
		index("student_teacher_requests__teacher_id_idx").on(table.teacherId),
		foreignKey({
			columns: [table.studentContractId],
			foreignColumns: [studentContracts.id],
			name: "student_teacher_requests__student_contract_id_fkey",
		}),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_teacher_requests__student_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "student_teacher_requests__teacher_id_fkey",
		}),
	],
)
