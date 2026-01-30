import { index, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const studentSpecificConditions = pgTable(
	"student_specific_conditions",
	{
		id,
		description: varchar("description", { length: 255 }).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("student_specific_conditions_deleted_at_idx").on(table.deletedAt)],
)
