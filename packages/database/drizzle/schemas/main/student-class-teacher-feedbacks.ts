import { foreignKey, index, integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { studentClasses } from "./student-classes"
import { teachers } from "./teachers"

export const studentClassTeacherFeedbacks = pgTable(
	"student_class_teacher_feedbacks",
	{
		id,
		studentClassId: varchar("student_class_id", { length: 16 }).notNull(),
		speakRating: integer("speak_rating").notNull(),
		readRating: integer("read_rating").notNull(),
		writeRating: integer("write_rating").notNull(),
		lectureRating: integer("lecture_rating").notNull(),
		rearingRating: integer("rearing_rating").notNull(),
		gramaticalRating: integer("gramatical_rating").notNull(),
		pronunceRating: integer("pronunce_rating").notNull(),
		vocabularyRating: integer("vocabulary_rating").notNull(),
		description: text("description"),
		teacherEntityId: varchar("teacher_entity_id", { length: 16 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("student_class_teacher_feedbacks_deleted_at_idx").on(table.deletedAt),
		uniqueIndex("student_class_teacher_feedbacks__student_class_id_key").on(
			table.studentClassId,
		),
		index("student_class_teacher_feedbacks__teacher_entity_id_idx").on(table.teacherEntityId),
		foreignKey({
			columns: [table.studentClassId],
			foreignColumns: [studentClasses.id],
			name: "student_class_teacher_feedbacks__student_class_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherEntityId],
			foreignColumns: [teachers.id],
			name: "student_class_teacher_feedbacks__teacher_entity_id_fkey",
		}),
	],
)
