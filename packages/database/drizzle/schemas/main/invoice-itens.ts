import { boolean, decimal, foreignKey, index, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { invoices } from "./invoices"
import { studentContracts } from "./student-contracts"

export const invoiceItemType = pgEnum("invoice_item_type", [
	"first_payment", // 1a Mensalidade = 0
	"month_due", // Mensalidade = 1
	"renew_contract", // Rematrícula = 2
	"free_month", // Mês Gratuito = 3
	"other", // Lançamento Manual = 4
	"indication", // Indicação = 5
	"taxes", // Juros e Multa = 6
	"discount", // Desconto = 7 (C#: Discont)
	"refund", // Estorno = 8 (C#: Refound)
	"promotion", // Promoção = 9
	"promotion_credit", // Crédito Promoção = 10
	"pause_credit", // Crédito Pausa = 11
	"register_payment", // Taxa de Matrícula = 12
])

export const invoiceItens = pgTable(
	"invoice_itens",
	{
		id,
		invoiceId: varchar("invoice_id", { length: 16 }).notNull(),
		studentContractId: varchar("student_contract_id", { length: 16 }),
		description: varchar("description", { length: 200 }).notNull(),
		isCredit: boolean("is_credit").notNull(),
		value: decimal("value", { precision: 18, scale: 2 }).notNull(),
		invoiceItemType: invoiceItemType("invoice_item_type").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("idx_invoiceitem_invoiceid_removedat").on(table.invoiceId, table.deletedAt),
		index("idx_invoiceitens_invoice_removed").on(table.invoiceId, table.deletedAt),
		index("invoice_itens__invoice_id_idx").on(table.invoiceId),
		index("invoice_itens__student_contract_id_idx").on(table.studentContractId),
		foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoices.id],
			name: "invoice_itens__invoice_id_fkey",
		}),
		foreignKey({
			columns: [table.studentContractId],
			foreignColumns: [studentContracts.id],
			name: "invoice_itens__student_contract_id_fkey",
		}),
	],
)
