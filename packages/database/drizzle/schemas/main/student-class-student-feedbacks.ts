import { foreignKey, index, integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentClasses } from "./student-classes"

export const studentClassStudentFeedbacks = pgTable(
	"student_class_student_feedbacks",
	{
		id,
		studentClassId: varchar("student_class_id", { length: 16 }).notNull(),
		teacherRating: integer("teacher_rating").notNull(),
		description: text("description"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_class_student_feedbacks_deleted_at_idx").on(table.deletedAt),
		uniqueIndex("student_class_student_feedbacks__student_class_id_key").on(
			table.studentClassId,
		),
		foreignKey({
			columns: [table.studentClassId],
			foreignColumns: [studentClasses.id],
			name: "student_class_student_feedbacks_fkey",
		}),
	],
)
