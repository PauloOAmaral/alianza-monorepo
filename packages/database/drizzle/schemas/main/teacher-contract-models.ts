import { index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const teacherContractModels = pgTable(
	"teacher_contract_models",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		content: text("content").notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("teacher_contract_models_deleted_at_idx").on(table.deletedAt)],
)
