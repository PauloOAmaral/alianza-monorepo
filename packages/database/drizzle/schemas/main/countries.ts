import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const countries = pgTable(
	"countries",
	{
		id,
		name: varchar("name", { length: 150 }).notNull(),
		nationality: varchar("nationality", { length: 100 }).notNull(),
		countryAlpha2Code: varchar("country_alpha2_code", { length: 4 }),
		postalCodeMask: varchar("postal_code_mask", { length: 12 }),
		phoneCountryCode: varchar("phone_country_code", { length: 4 }),
		phoneMask: varchar("phone_mask", { length: 20 }),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [uniqueIndex("countries__name_key").on(table.name)],
)
