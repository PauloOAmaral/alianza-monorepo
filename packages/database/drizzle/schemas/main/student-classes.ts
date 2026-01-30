import {
	boolean,
	foreignKey,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { disciplines } from "./disciplines"
import { invoiceItens } from "./invoice-itens"
import { leads } from "./leads"
import { students } from "./students"
import { teachers } from "./teachers"

export const classStatus = pgEnum("class_status", [
	"scheduled", // Agendada = 0
	"completed", // Concluída = 1
	"missed_student", // Falta Aluno = 2
	"canceled", // Cancelada = 3
	"refunded", // Reembolsado = 4
	"missed_teacher", // Falta Professor = 5
	"awaiting_student_approval", // Aguardando Aprovação Aluno = 6 (C#: AwaitStudentAprove)
	"student_reject", // Aluno não aprovou a Aula = 7
	"completed_holiday", // Concluída - Feriado = 8
])

export const classType = pgEnum("class_type", [
	"effective", // Efetiva = 1
	"experimental", // Experimental = 2
])

export const studentClasses = pgTable(
	"student_classes",
	{
		id,
		invoiceItemId: varchar("invoice_item_id", { length: 16 }),
		leadId: varchar("lead_id", { length: 16 }),
		studentId: varchar("student_id", { length: 16 }),
		disciplineId: varchar("discipline_id", { length: 16 }).notNull(),
		teacherId: varchar("teacher_id", { length: 16 }),
		classDate: timestamp("class_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		duration: integer("duration").notNull(),
		classLink: varchar("class_link", { length: 500 }),
		status: classStatus("status").notNull(),
		rescheduled: boolean("rescheduled").notNull(),
		twoHoursSchedulle: boolean("two_hours_schedulle").notNull(),
		thirtyMinSchedulle: boolean("thirty_min_schedulle").notNull(),
		type: classType("type").default("effective").notNull(),
		observation: text("observation"),
		classEgressLink: varchar("class_egress_link", { length: 500 }),
		conferenceId: varchar("conference_id", { length: 30 }),
		eventId: varchar("event_id", { length: 30 }),
		roomId: varchar("room_id", { length: 30 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("idx_studentclass_id_classlink_removed").on(
			table.id,
			table.classLink,
			table.deletedAt,
		),
		index("allocate_students_idx").on(
			table.teacherId,
			table.classDate,
			table.status,
			table.rescheduled,
			table.deletedAt,
		),
		index("classes__student__status__date__time_idx").on(
			table.studentId,
			table.status,
			table.classDate,
		),
		index("student_classes__discipline_id_idx").on(table.disciplineId),
		index("student_classes__invoice_item_id_idx").on(table.invoiceItemId),
		uniqueIndex("student_classes__lead_id_key").on(table.leadId),
		index("student_classes_deleted_at_idx").on(table.deletedAt),
		index("student_classes__student_id_idx").on(table.studentId),
		index("student_classes__teacher_id_idx").on(table.teacherId),
		index("student_classes__teacher_id__status_idx").on(table.teacherId, table.status),
		index("sclass_teacher_status_date_start_idx").on(
			table.teacherId,
			table.status,
			table.classDate,
		),
		foreignKey({
			columns: [table.disciplineId],
			foreignColumns: [disciplines.id],
			name: "student_classes__discipline_id_fkey",
		}),
		foreignKey({
			columns: [table.invoiceItemId],
			foreignColumns: [invoiceItens.id],
			name: "student_classes__invoice_item_id_fkey",
		}),
		foreignKey({
			columns: [table.leadId],
			foreignColumns: [leads.id],
			name: "student_classes__lead_id_fkey",
		}),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_classes__student_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "student_classes__teacher_id_fkey",
		}),
	],
)
