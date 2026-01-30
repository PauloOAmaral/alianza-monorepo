import { foreignKey, index, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { teacherRequestTypes } from "./teacher-request-types"
import { teachers } from "./teachers"

export const teacherRequestStatus = pgEnum("teacher_request_status", [
	"awaiting", // Aguardando = 0
	"requested", // Solicitada = 1
	"accepted", // Aceita = 2
	"refused", // Rejeitada = 3
	"expired", // Expirado = 4
])

export const teacherRequests = pgTable(
	"teacher_requests",
	{
		id,
		teacherId: varchar("teacher_id", { length: 16 }).notNull(),
		teacherRequestTypeId: varchar("teacher_request_type_id", { length: 16 }).notNull(),
		status: teacherRequestStatus("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("teacher_requests_deleted_at_idx").on(table.deletedAt),
		index("teacher_requests__teacher_id_idx").on(table.teacherId),
		index("teacher_requests__teacher_request_type_id_idx").on(table.teacherRequestTypeId),
		foreignKey({
			columns: [table.teacherRequestTypeId],
			foreignColumns: [teacherRequestTypes.id],
			name: "teacher_requests__teacher_request_type_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "teacher_requests__teacher_id_fkey",
		}),
	],
)
