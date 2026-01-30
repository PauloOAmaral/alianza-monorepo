import { foreignKey, index, integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { paymentType as paymentTypeEnum } from "../common"
import { collectors } from "./collectors"
import { currencies } from "./currencies"
import { students } from "./students"

export const invoiceStatus = pgEnum("invoice_status", [
	"charge", // A Cobrar = 0
	"waiting_payment", // Aguardando pagamento = 1
	"late_payment", // Atrasado = 2
	"paid", // Pago = 3
	"canceled", // Cancelada = 4
	"unpaid", // Não paga = 5
	"refunded", // Estornada = 6 (C#: Refound)
	"partial_paid", // Pago Parcial = 7 (C#: ParcialPaid)
	"late_paid", // Pago Em Atraso = 8
]);

export const invoices = pgTable(
	"invoices",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		dueDate: timestamp("due_date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		currencyId: varchar("currency_id", { length: 16 }).notNull(),
		invoiceStatus: invoiceStatus("invoice_status").notNull(),
		paymentType: paymentTypeEnum("payment_type").default("payment_link").notNull(),
		paidAt: timestamp("paid_at", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		collectorId: varchar("collector_id", { length: 16 }),
		boletoStatus: integer("boleto_status"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("idx_invoices_grid").on(table.deletedAt, table.dueDate),
		index("invoices__collector_id_idx").on(table.collectorId),
		index("invoices__currency_id_idx").on(table.currencyId),
		index("invoices__student_id_idx").on(table.studentId),
		foreignKey({
			columns: [table.collectorId],
			foreignColumns: [collectors.id],
			name: "invoices__collector_id_fkey",
		}),
		foreignKey({
			columns: [table.currencyId],
			foreignColumns: [currencies.id],
			name: "invoices__currency_id_fkey",
		}),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "invoices__student_id_fkey",
		}),
	],
)
