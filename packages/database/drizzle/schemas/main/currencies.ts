import { index, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const currencies = pgTable(
	"currencies",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		code: varchar("code", { length: 4 }).notNull(),
		symbol: varchar("symbol", { length: 10 }).notNull(),
		countryAlpha2Code: varchar("country_alpha2_code", { length: 4 }).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("currencies_deleted_at_idx").on(table.deletedAt)],
)
