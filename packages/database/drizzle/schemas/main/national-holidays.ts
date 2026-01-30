import {
	boolean,
	foreignKey,
	index,
	pgTable,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { countries } from "./countries"

/** Tipo do registro: feriado ou evento. */
export const nationalHolidayTypeEnum = ["holiday", "event"] as const
export type NationalHolidayType = (typeof nationalHolidayTypeEnum)[number]

/**
 * Feriados e eventos por país. Permite cadastrar feriados ou eventos de qualquer
 * país (countryId), para suportar escolas que atuam em múltiplos países.
 */
export const nationalHolidays = pgTable(
	"national_holidays",
	{
		id,
		type: varchar("type", { length: 20 }).notNull(), // "holiday" | "event"
		name: varchar("name", { length: 200 }).notNull(),
		date: timestamp("date", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		isMovable: boolean("is_movable").notNull(),
		countryId: varchar("country_id", { length: 16 }).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("national_holidays__country_id_idx").on(table.countryId),
		index("national_holidays__type_idx").on(table.type),
		uniqueIndex("national_holidays__country_id_date_name_key").on(
			table.countryId,
			table.date,
			table.name,
		),
		foreignKey({
			columns: [table.countryId],
			foreignColumns: [countries.id],
			name: "national_holidays_fkey",
		}),
	],
)
