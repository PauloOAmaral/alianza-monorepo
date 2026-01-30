import { index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const books = pgTable(
	"books",
	{
		id,
		title: varchar("title", { length: 200 }).notNull(),
		description: text("description"),
		orderIndex: integer("order_index").notNull(),
		imageUrl: text("image_url"),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("books__order_index_idx").on(table.orderIndex)],
)
