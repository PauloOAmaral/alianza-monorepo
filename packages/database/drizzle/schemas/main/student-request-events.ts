import { char, foreignKey, index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentRequests } from "./student-requests"

export const studentRequestEvents = pgTable(
	"student_request_events",
	{
		id,
		studentRequestId: varchar("student_request_id", { length: 16 }).notNull(),
		message: text("message").notNull(),
		schoolRegistry: char("school_registry", { length: 14 }).notNull(),
		userName: varchar("user_name", { length: 150 }).notNull(),
		userProfilePicture: varchar("user_profile_picture", { length: 200 }).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_request_events_deleted_at_idx").on(table.deletedAt),
		index("student_request_events__student_request_id_idx").on(table.studentRequestId),
		foreignKey({
			columns: [table.studentRequestId],
			foreignColumns: [studentRequests.id],
			name: "student_request_events_fkey",
		}),
	],
)
