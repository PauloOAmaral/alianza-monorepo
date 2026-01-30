import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const studentTransferReasons = pgTable(
	"student_transfer_reasons",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(),
		status: integer("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [index("student_transfer_reasons_deleted_at_idx").on(table.deletedAt)],
)
