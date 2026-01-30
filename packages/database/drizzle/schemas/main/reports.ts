import { index, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const reportStatus = pgEnum("report_status", [
	"to_do", // Na fila = 0 (C#: ToDo)
	"doing", // Gerando = 1
	"error", // Falha = 2
	"done", // Concluído = 3
])

export const reportType = pgEnum("report_type", [
	"students", // Alunos = 0
	"invoices_by_collector", // Soma de faturas por cobrador = 1
	"invoices", // Listagem de faturas = 2
	"requests", // Cancelamentos = 3
	"experimental_classes", // Aulas Experimentais = 4
	"classes", // Classes = 5
	"instructor_close_month", // Fechamento de Folha Professores = 6
])

export const reports = pgTable(
	"reports",
	{
		id,
		userAdminId: varchar("user_admin_id", { length: 16 }).notNull(),
		type: reportType("type").notNull(),
		fileLink: text("file_link"),
		startDate: timestamp("start_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		endDate: timestamp("end_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		status: reportStatus("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("reports_deleted_at_idx").on(table.deletedAt)],
)
