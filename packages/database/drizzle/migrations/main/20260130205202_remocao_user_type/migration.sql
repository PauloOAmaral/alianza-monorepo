CREATE TYPE "student_class_event_types" AS ENUM('student_class_event_type_1', 'student_class_event_type_2', 'student_class_event_type_3');--> statement-breakpoint
ALTER TABLE "student_class_events" DROP COLUMN "user_type";--> statement-breakpoint
ALTER TABLE "student_class_events" ALTER COLUMN "event" SET DATA TYPE "student_class_event_types" USING "event"::"student_class_event_types";--> statement-breakpoint
CREATE INDEX "student_classes__id_idx" ON "student_classes" ("id");