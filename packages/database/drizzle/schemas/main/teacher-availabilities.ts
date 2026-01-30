import { foreignKey, index, integer, pgTable, time, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { teachers } from "./teachers"

export const teacherAvailabilities = pgTable(
	"teacher_availabilities",
	{
		id,
		teacherId: varchar("teacher_id", { length: 16 }).notNull(),
		dayOfWeek: integer("day_of_week").notNull(),
		startTime: time("start_time").notNull(),
		endTime: time("end_time").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("teacher_availabilities_deleted_at_idx").on(table.deletedAt),
		index("teacher_availabilities__teacher_id_idx").on(table.teacherId),
		foreignKey({
			columns: [table.teacherId],
			foreignColumns: [teachers.id],
			name: "teacher_availabilities_fkey",
		}),
	],
)
