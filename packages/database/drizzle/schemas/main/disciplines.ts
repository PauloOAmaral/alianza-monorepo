import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const disciplines = pgTable(
	"disciplines",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [uniqueIndex("disciplines__name_key").on(table.name)],
)
