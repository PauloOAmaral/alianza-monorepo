import { index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const teacherTerms = pgTable(
	"teacher_terms",
	{
		id,
		title: varchar("title", { length: 100 }).notNull(),
		content: text("content").notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("teacher_terms_deleted_at_idx").on(table.deletedAt)],
)
