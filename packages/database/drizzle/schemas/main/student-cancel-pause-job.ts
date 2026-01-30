import { boolean, foreignKey, index, integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { students } from "./students"

export const pauseCancelStatus = pgEnum("pause_cancel_status", [
	"awaiting", // Aguardando = 0
	"in_stop", // Em Pausa = 1 (C#: InStop)
	"returned", // Retornado = 2
	"student_canceled", // Aluno Cancelado = 3
	"canceled", // Solicitação Cancelada = 4
])

export const pauseCancelType = pgEnum("pause_cancel_type", [
	"to_stop", // Pausa = 0 (C#: ToStop)
	"to_cancel", // Cancelamento = 1 (C#: ToCancel)
])

export const stopReason = pgEnum("stop_reason", [
	"work", // Trabalho = 0
	"personal_reasons", // Motivos pessoais = 1
	"travel", // Viagem = 2
	"other_studies", // Outros estudos = 3
	"holidays", // Férias = 4
	"lack_of_time", // Falta de tempo = 5
])

export const studentCancelPauseJob = pgTable(
	"student_cancel_pause_job",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		effectiveDate: timestamp("effective_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		returnDate: timestamp("return_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		status: pauseCancelStatus("status").notNull(),
		type: pauseCancelType("type").notNull(),
		cancelReason: integer("cancel_reason"),
		stopReason: stopReason("stop_reason"),
		keepTeacher: boolean("keep_teacher").default(false).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_cancel_pause_job_deleted_at_idx").on(table.deletedAt),
		index("student_cancel_pause_job__student_id_idx").on(table.studentId),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_cancel_pause_job_fkey",
		}),
	],
)
