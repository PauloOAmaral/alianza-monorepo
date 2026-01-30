import {
	boolean,
	foreignKey,
	index,
	integer,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentTerms } from "./student-terms"
import { students } from "./students"

export const studentWithTerms = pgTable(
	"student_with_terms",
	{
		id,
		studentId: varchar("student_id", { length: 16 }).notNull(),
		studentTermId: varchar("student_term_id", { length: 16 }).notNull(),
		isAccept: boolean("is_accept").notNull(),
		token: varchar("token", { length: 100 }).notNull(),
		acceptAt: timestamp("accept_at", {
			precision: 6,
			withTimezone: true,
			mode: "date",
		}),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_with_terms_deleted_at_idx").on(table.deletedAt),
		index("student_with_terms__student_id_idx").on(table.studentId),
		index("student_with_terms__student_term_id_idx").on(table.studentTermId),
		foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_with_terms__student_id_fkey",
		}),
		foreignKey({
			columns: [table.studentTermId],
			foreignColumns: [studentTerms.id],
			name: "student_with_terms__student_term_id_fkey",
		}),
	],
)
