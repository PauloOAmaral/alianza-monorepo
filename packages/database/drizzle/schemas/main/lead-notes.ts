import { char, foreignKey, index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { leads } from "./leads"

export const leadNotes = pgTable(
	"lead_notes",
	{
		id,
		leadId: varchar("lead_id", { length: 16 }).notNull(),
		message: text("message").notNull(),
		schoolRegistry: char("school_registry", { length: 14 }).notNull(),
		userName: varchar("user_name", { length: 200 }).notNull(),
		userProfilePicture: varchar("user_profile_picture", { length: 250 }).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("lead_notes__lead_id_idx").on(table.leadId),
		foreignKey({
			columns: [table.leadId],
			foreignColumns: [leads.id],
			name: "lead_notes_fkey",
		}),
	],
)
