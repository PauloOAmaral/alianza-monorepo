import { foreignKey, index, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { studentClassExperimentalFeedbacks } from "./student-class-experimental-feedbacks"
import { teacherAttributes } from "./teacher-attributes"

export const teacherAttributeWithExperimentalFeedbacks = pgTable(
	"teacher_attribute_with_experimental_feedbacks",
	{
		id,
		teacherAttributeId: varchar("teacher_attribute_id", { length: 16 }).notNull(),
		studentClassExperimentalFeedbackId: varchar("student_class_experimental_feedback_id", {
			length: 16,
		}).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("tawef_deleted_at_idx").on(table.deletedAt),
		index("tawef_scef_id_idx").on(table.studentClassExperimentalFeedbackId),
		uniqueIndex("tawef_ta_scef_uk").on(
			table.teacherAttributeId,
			table.studentClassExperimentalFeedbackId,
		),
		foreignKey({
			columns: [table.studentClassExperimentalFeedbackId],
			foreignColumns: [studentClassExperimentalFeedbacks.id],
			name: "tawef_scef_id_fkey",
		}),
		foreignKey({
			columns: [table.teacherAttributeId],
			foreignColumns: [teacherAttributes.id],
			name: "tawef_ta_id_fkey",
		}),
	],
)
