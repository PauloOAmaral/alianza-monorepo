import { index, integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const squads = pgTable(
	"squads",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		status: integer("status").notNull(),
		primaryPhoneCountryCode: varchar("primary_phone_country_code", { length: 4 }),
		primaryPhoneNumber: varchar("primary_phone_number", { length: 20 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		uniqueIndex("squads__name_key").on(table.name),
		index("squads_deleted_at_idx").on(table.deletedAt),
	],
)
