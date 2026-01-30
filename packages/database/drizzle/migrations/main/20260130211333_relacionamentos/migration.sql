DROP TABLE "student_ranking";--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "user_password_reset" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "user_sessions" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "issue_activities" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "issue_comments" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "student_class_events" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER TABLE "student_class_meet_events" RENAME COLUMN "user_id" TO "user_tenant_id";--> statement-breakpoint
ALTER INDEX "issue_activities__user_id_idx" RENAME TO "issue_activities__user_tenant_id_idx";--> statement-breakpoint
ALTER INDEX "issue_comments__user_id_idx" RENAME TO "issue_comments__user_tenant_id_idx";--> statement-breakpoint
ALTER INDEX "refresh_tokens__user_type__user_id__revoked_at__expires_at_idx" RENAME TO "refresh_tokens__user_type__user_tenant_id__revoked_at__expires_at_idx";--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" RENAME CONSTRAINT "terms_of_use_acceptances_user_id_fkey" TO "terms_of_use_acceptances_user_tenant_id_fkey";--> statement-breakpoint
ALTER TABLE "user_password_reset" RENAME CONSTRAINT "password_reset_user_id_fkey" TO "password_reset_user_tenant_id_fkey";--> statement-breakpoint
ALTER TABLE "user_sessions" RENAME CONSTRAINT "user_sessions_user_id_fkey" TO "user_sessions_user_tenant_id_fkey";--> statement-breakpoint
ALTER TABLE "issue_activities" ADD CONSTRAINT "issue_activities_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id");--> statement-breakpoint
ALTER TABLE "issue_comments" ADD CONSTRAINT "issue_comments_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id");--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id");--> statement-breakpoint
ALTER TABLE "student_class_events" ADD CONSTRAINT "student_class_events_user_tenant_id_user_tenants_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id");--> statement-breakpoint
ALTER TABLE "student_class_meet_events" ADD CONSTRAINT "student_class_meet_events_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id");--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" DROP CONSTRAINT "terms_of_use_acceptances_user_tenant_id_fkey", ADD CONSTRAINT "terms_of_use_acceptances_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_password_reset" DROP CONSTRAINT "password_reset_user_tenant_id_fkey", ADD CONSTRAINT "password_reset_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_user_tenant_id_fkey", ADD CONSTRAINT "user_sessions_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id") ON DELETE CASCADE;