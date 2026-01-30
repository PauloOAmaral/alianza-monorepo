import {
	foreignKey,
	index,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { tenants } from "../common"
import { students } from "./students"

export const studentInternalNotes = pgTable(
	"student_internal_notes",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		userAdminId: varchar("user_admin_id", { length: 16 }).notNull(),
		message: text("message").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_internal_notes_deleted_at_idx").on(table.deletedAt),
		index("student_internal_notes__student_id_idx").on(table.studentId),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_internal_notes_fkey",
		}),
	],
)
