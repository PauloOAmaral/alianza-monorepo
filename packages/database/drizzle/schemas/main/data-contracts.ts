import {
	boolean,
	char,
	foreignKey,
	index,
	integer,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { addresses, gender as genderEnum } from "../common"
import { countries } from "./countries"

export const dataContracts = pgTable(
	"data_contracts",
	{
		id,
		financialResponsibleId: varchar("financial_responsible_id", { length: 16 }),
		name: varchar("name", { length: 200 }),
		email: varchar("email", { length: 200 }),
		primaryPhoneCountryCode: char("primary_phone_country_code", { length: 4 }),
		primaryPhoneNumber: char("primary_phone_number", { length: 20 }),
		birthday: timestamp("birthday"),
		secondaryPhoneCountryCode: char("secondary_phone_country_code", { length: 4 }),
		secondaryPhoneNumber: char("secondary_phone_number", { length: 20 }),
		vatNumber: char("vat_number", { length: 40 }),
		documentType: integer("document_type"),
		gender: genderEnum("gender"),
		isResponsible: boolean("is_responsible").notNull(),
		addressId: varchar("address_id", { length: 16 }),
		relationship: varchar("relationship", { length: 50 }),
		nationalityId: varchar("nationality_id", { length: 16 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("data_contracts__address_id_idx").on(table.addressId),
		index("data_contracts__financial_responsible_id_idx").on(table.financialResponsibleId),
		index("data_contracts__nationality_id_idx").on(table.nationalityId),
		foreignKey({
			columns: [table.addressId],
			foreignColumns: [addresses.id],
			name: "data_contracts__address_id_fkey",
		}),
		foreignKey({
			columns: [table.nationalityId],
			foreignColumns: [countries.id],
			name: "data_contracts__nationality_id_fkey",
		}),
	],
)
