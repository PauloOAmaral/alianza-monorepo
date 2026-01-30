import {
	char,
	foreignKey,
	index,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { teacherRequests } from "./teacher-requests"

export const teacherRequestEvents = pgTable(
	"teacher_request_events",
	{
		id,
		teacherRequestId: varchar("teacher_request_id", { length: 16 }).notNull(),
		message: text("message").notNull(),
		schoolRegistry: char("school_registry", { length: 14 }).notNull(),
		userName: varchar("user_name", { length: 150 }).notNull(),
		userProfilePicture: varchar("user_profile_picture", { length: 200 }).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("teacher_request_events_deleted_at_idx").on(table.deletedAt),
		index("teacher_request_events__teacher_request_id_idx").on(table.teacherRequestId),
		foreignKey({
			columns: [table.teacherRequestId],
			foreignColumns: [teacherRequests.id],
			name: "teacher_request_events_fkey",
		}),
	],
)
