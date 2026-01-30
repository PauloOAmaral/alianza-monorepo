import { decimal, foreignKey, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { currencies } from "./currencies"
import { disciplines } from "./disciplines"

export const studentContractPackages = pgTable(
	"student_contract_packages",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		description: text("description"),
		maxValue: decimal("max_value", { precision: 18, scale: 2 }).notNull(),
		minValue: decimal("min_value", { precision: 18, scale: 2 }).notNull(),
		weeklyClassCount: integer("weekly_class_count").notNull(),
		saleStart: timestamp("sale_start", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		saleEnd: timestamp("sale_end", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		classDuration: integer("class_duration").notNull(),
		currencyId: varchar("currency_id", { length: 16 }).notNull(),
		disciplineId: varchar("discipline_id", { length: 16 }).notNull(),
		reschedulingLimit: integer("rescheduling_limit").notNull(),
		status: integer("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_contract_packages__currency_id_idx").on(table.currencyId),
		index("student_contract_packages__discipline_id_idx").on(table.disciplineId),
		index("student_contract_packages_deleted_at_idx").on(table.deletedAt),
		foreignKey({
			columns: [table.currencyId],
			foreignColumns: [currencies.id],
			name: "student_contract_packages__currency_id_fkey",
		}),
		foreignKey({
			columns: [table.disciplineId],
			foreignColumns: [disciplines.id],
			name: "student_contract_packages__discipline_id_fkey",
		}),
	],
)
