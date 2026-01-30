import {
	boolean,
	index,
	pgEnum,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const urgencyEnum = pgEnum("urgency", [
	"low", // Baixa = 0
	"medium", // Média = 1
	"high", // Alta = 2
])

export const teacherRequestTypes = pgTable(
	"teacher_request_types",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		description: text("description").notNull(),
		urgency: urgencyEnum("urgency").notNull(),
		isFinancial: boolean("is_financial").notNull(),
		isInternal: boolean("is_internal").default(false).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("teacher_request_types_deleted_at_idx").on(table.deletedAt)],
)
