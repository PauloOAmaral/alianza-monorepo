ALTER TABLE "users" ADD COLUMN "google_id" varchar(128);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_google_id_key" ON "users" USING btree ("google_id");
