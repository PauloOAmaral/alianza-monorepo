import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const studentClassEvents = pgTable(
	"student_class_events",
	{
		id,
		externalStudentClassId: varchar("external_student_class_id", { length: 36 }).notNull(),
		userType: integer("user_type").notNull(),
		event: integer("event").notNull(),
		userId: varchar("user_id", { length: 16 }).notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("student_class_events_deleted_at_idx").on(table.deletedAt)],
)
