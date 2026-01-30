import { index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const articles = pgTable(
	"articles",
	{
		id,
		title: varchar("title", { length: 100 }).notNull(),
		videoLink: text("video_link"),
		content: text("content").notNull(),
		readCount: integer("read_count").default(0).notNull(),
		status: integer("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("articles__title_idx").on(table.title)],
)
