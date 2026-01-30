ALTER TABLE "student_class_events" ADD COLUMN "user_type" "user_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "student_class_events" ADD COLUMN "event" "student_class_event_types" NOT NULL;