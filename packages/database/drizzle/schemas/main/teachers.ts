import {
	boolean,
	char,
	foreignKey,
	index,
	pgEnum,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { addresses, documentType, gender as genderEnum } from "../common"
import { bankAccounts } from "./bank-accounts"
import { countries } from "./countries"
import { squads } from "./squads"

export const teacherStatus = pgEnum("teacher_status", [
	"active", // Ativo = 0
	"inactive", // Inativo = 1
])

export const teachers = pgTable(
	"teachers",
	{
		id,
		squadId: varchar("squad_id", { length: 16 }).notNull(),
		addressId: varchar("address_id", { length: 16 }).notNull(),
		classLink: varchar("class_link", { length: 300 }),
		isOldInstructor: boolean("is_old_instructor").notNull(),
		status: teacherStatus("status").notNull(),
		bankAccountId: varchar("bank_account_id", { length: 16 }),
		name: varchar("name", { length: 300 }).notNull(),
		email: varchar("email", { length: 200 }).notNull(),
		schoolRegistry: char("school_registry", { length: 14 }).notNull(),
		profilePicture: varchar("profile_picture", { length: 300 }),
		birthday: timestamp("birthday", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}).notNull(),
		verificationToken: char("verification_token", { length: 10 }),
		verifiedAt: timestamp("verified_at"),
		primaryPhoneCountryCode: char("primary_phone_country_code", { length: 4 }).notNull(),
		primaryPhoneNumber: char("primary_phone_number", { length: 20 }).notNull(),
		secondaryPhoneCountryCode: char("secondary_phone_country_code", { length: 4 }),
		secondaryPhoneNumber: char("secondary_phone_number", { length: 20 }),
		vatNumber: char("vat_number", { length: 40 }).notNull(),
		documentType: documentType("document_type").notNull(),
		gender: genderEnum("gender").notNull(),
		password: varchar("password", { length: 200 }).notNull(),
		passwordResetToken: char("password_reset_token", { length: 10 }),
		passwordResetTokenExpiration: timestamp("password_reset_token_expiration"),
		mobileDeviceToken: varchar("mobile_device_token", { length: 300 }),
		firstAccess: boolean("first_access").notNull(),
		sendNotificationsBlock: boolean("send_notifications_block").default(false).notNull(),
		nationalityId: varchar("nationality_id", { length: 16 }).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("teachers__address_id_idx").on(table.addressId),
		index("teachers__bank_account_id_idx").on(table.bankAccountId),
		index("teachers__nationality_id_idx").on(table.nationalityId),
		index("teachers_deleted_at_idx").on(table.deletedAt),
		index("teachers__squad_id_idx").on(table.squadId),
		foreignKey({
			columns: [table.addressId],
			foreignColumns: [addresses.id],
			name: "teachers__address_id_fkey",
		}),
		foreignKey({
			columns: [table.bankAccountId],
			foreignColumns: [bankAccounts.id],
			name: "teachers__bank_account_id_fkey",
		}),
		foreignKey({
			columns: [table.nationalityId],
			foreignColumns: [countries.id],
			name: "teachers__nationality_id_fkey",
		}),
		foreignKey({
			columns: [table.squadId],
			foreignColumns: [squads.id],
			name: "teachers__squad_id_fkey",
		}),
	],
)
