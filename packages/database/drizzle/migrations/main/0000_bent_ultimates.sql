CREATE TYPE "public"."document_type" AS ENUM('cpf', 'cnpj', 'tax_id');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('unknown', 'masculine', 'feminine');--> statement-breakpoint
CREATE TYPE "public"."language_type" AS ENUM('en', 'pt', 'es');--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('basic_i', 'basic_ii', 'pre_intermediate', 'intermediate', 'upper_intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('payment_link', 'bank_transfer', 'paypal', 'mercado_livre', 'zelle', 'venmo');--> statement-breakpoint
CREATE TYPE "public"."permission_type" AS ENUM('full', 'users_view', 'users_edit', 'users_create', 'users_delete', 'permissions_view', 'permissions_edit', 'permissions_create', 'permissions_delete', 'lead_view', 'lead_edit', 'lead_create', 'lead_import', 'lead_delete');--> statement-breakpoint
CREATE TYPE "public"."user_context_role_type" AS ENUM('system_admin', 'alianza_admin');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('student', 'teacher', 'financial_responsible', 'alianza');--> statement-breakpoint
CREATE TYPE "public"."american_timezone" AS ENUM('America/Adak', 'America/Anchorage', 'America/Atikokan', 'America/Blanc-Sablon', 'America/Boise', 'America/Cambridge_Bay', 'America/Chicago', 'America/Creston', 'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Edmonton', 'America/Fort_Nelson', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Halifax', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Inuvik', 'America/Iqaluit', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Los_Angeles', 'America/Menominee', 'America/Metlakatla', 'America/Moncton', 'America/Nome', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/New_York', 'America/Phoenix', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Regina', 'America/Resolute', 'America/Sitka', 'America/Swift_Current', 'America/St_Johns', 'America/Thunder_Bay', 'America/Toronto', 'America/Vancouver', 'America/Whitehorse', 'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'America/Bahia_Banderas', 'America/Cancun', 'America/Chihuahua', 'America/Ciudad_Juarez', 'America/Hermosillo', 'America/Matamoros', 'America/Mazatlan', 'America/Merida', 'America/Mexico_City', 'America/Monterrey', 'America/Ojinaga', 'America/Tijuana', 'America/Belize', 'America/Costa_Rica', 'America/El_Salvador', 'America/Guatemala', 'America/Managua', 'America/Panama', 'America/Tegucigalpa', 'America/Anguilla', 'America/Antigua', 'America/Aruba', 'America/Barbados', 'America/Cayman', 'America/Curacao', 'America/Dominica', 'America/Grand_Turk', 'America/Guadeloupe', 'America/Havana', 'America/Jamaica', 'America/Kralendijk', 'America/Lower_Princes', 'America/Marigot', 'America/Martinique', 'America/Montserrat', 'America/Nassau', 'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Puerto_Rico', 'America/Santo_Domingo', 'America/St_Barthelemy', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent', 'America/Tortola', 'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Asuncion', 'America/Bahia', 'America/Belem', 'America/Boa_Vista', 'America/Bogota', 'America/Campo_Grande', 'America/Caracas', 'America/Cayenne', 'America/Cuiaba', 'America/Eirunepe', 'America/Fortaleza', 'America/Guyana', 'America/La_Paz', 'America/Lima', 'America/Maceio', 'America/Manaus', 'America/Montevideo', 'America/Noronha', 'America/Paramaribo', 'America/Porto_Velho', 'America/Punta_Arenas', 'America/Recife', 'America/Rio_Branco', 'America/Santarem', 'America/Santiago', 'America/Sao_Paulo', 'America/Danmarkshavn', 'America/Nuuk', 'America/Scoresbysund', 'America/Thule', 'America/Miquelon');--> statement-breakpoint
CREATE TYPE "public"."campaign_source" AS ENUM('facebook', 'messenger', 'instagram', 'direct', 'google', 'tiktok', 'youtube', 'blog', 'email', 'indication', 'company', 'affiliate', 'influencer', 'student_indication', 'fb_forms', 'ex_student', 'campaign');--> statement-breakpoint
CREATE TYPE "public"."invoice_item_type" AS ENUM('first_payment', 'month_due', 'renew_contract', 'free_month', 'other', 'indication', 'taxes', 'discount', 'refund', 'promotion', 'promotion_credit', 'pause_credit', 'register_payment');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('charge', 'waiting_payment', 'late_payment', 'paid', 'canceled', 'unpaid', 'refunded', 'partial_paid', 'late_paid');--> statement-breakpoint
CREATE TYPE "public"."issue_activity_type" AS ENUM('create', 'update', 'delete', 'comment', 'comment_mention', 'assign', 'attach', 'detach', 'status_change', 'priority_change', 'new_release');--> statement-breakpoint
CREATE TYPE "public"."issue_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."issue_section" AS ENUM('commerce', 'pedagogic', 'financial', 'marketing', 'experimental_class');--> statement-breakpoint
CREATE TYPE "public"."issue_status" AS ENUM('open', 'in_progress', 'on_hold', 'resolved', 'closed', 'awaiting_approval');--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('bug', 'feature_request', 'improvement', 'questions', 'permission');--> statement-breakpoint
CREATE TYPE "public"."lead_import_status" AS ENUM('pending', 'processed', 'failed', 'partial');--> statement-breakpoint
CREATE TYPE "public"."age" AS ENUM('under_12', 'from_12_to_18', 'from_18_to_22', 'from_22_to_28', 'from_28_to_40', 'from_40_to_65', 'older_65');--> statement-breakpoint
CREATE TYPE "public"."disqualified_type" AS ENUM('profile_invalid', 'phone_number_replicate', 'phone_number_non_existent', 'student_not_answer');--> statement-breakpoint
CREATE TYPE "public"."lead_reschedule_reason" AS ENUM('lead_not_confirmed_experimental_class', 'requested_reschedule_due_to_unforeseen');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('pre_analisys', 'created', 'in_service', 'experimental_class', 'experimental_class_missed', 'feedback', 'contract', 'waiting_payment', 'paid', 'talk_later', 'disqualified');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'canceled', 'refunded', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('to_do', 'doing', 'error', 'done');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('students', 'invoices_by_collector', 'invoices', 'requests', 'experimental_classes', 'classes', 'instructor_close_month');--> statement-breakpoint
CREATE TYPE "public"."pause_cancel_status" AS ENUM('awaiting', 'in_stop', 'returned', 'student_canceled', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."pause_cancel_type" AS ENUM('to_stop', 'to_cancel');--> statement-breakpoint
CREATE TYPE "public"."stop_reason" AS ENUM('work', 'personal_reasons', 'travel', 'other_studies', 'holidays', 'lack_of_time');--> statement-breakpoint
CREATE TYPE "public"."student_class_event_types" AS ENUM('student_class_event_type_1', 'student_class_event_type_2', 'student_class_event_type_3');--> statement-breakpoint
CREATE TYPE "public"."requeriment_level" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."study_reason" AS ENUM('work', 'travel', 'apprenticeship', 'other');--> statement-breakpoint
CREATE TYPE "public"."class_status" AS ENUM('scheduled', 'completed', 'missed_student', 'canceled', 'refunded', 'missed_teacher', 'awaiting_student_approval', 'student_reject', 'completed_holiday');--> statement-breakpoint
CREATE TYPE "public"."class_type" AS ENUM('effective', 'experimental');--> statement-breakpoint
CREATE TYPE "public"."cancel_reason" AS ENUM('teacher', 'methodology', 'default', 'personal', 'financial', 'cdc', 'did_not_want_to_renew', 'did_not_start');--> statement-breakpoint
CREATE TYPE "public"."contract_sign_status" AS ENUM('waiting_sign', 'opened', 'in_progress', 'update_data', 'signed');--> statement-breakpoint
CREATE TYPE "public"."contract_status" AS ENUM('blocked', 'active', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."student_event_type" AS ENUM('student_registered', 'transfer_request', 'add_collector', 'reactivate_student', 'collector_removed', 'collector_removed_inative', 'change_new_class_in_app', 'student_waiting_instructor', 'instructor_accept_request', 'instructor_refuse_request', 'instructor_transfer_solicitation', 'invoice_paid', 'student_blocked', 'student_completed_class', 'instructor_inactivation', 'student_missed_class', 'financial_message', 'student_cancel_request', 'student_pause_request', 'student_paused', 'student_reactivated', 'student_canceled', 'lead_disqualified', 'lead_transfer_seller', 'lead_contract_signed', 'experimental_class_rescheduled', 'contract_create', 'seller_cancel_request', 'class_reschedule', 'class_completed_manual', 'class_missed_manual', 'class_canceled_manual', 'class_refunded_manual', 'class_missed_instructor_manual', 'class_awaiting_student_approve_manual', 'class_created_manual', 'class_edited_manual', 'instructor_not_approve_in_time', 'return_auto_transfer', 'move_to_manual_transfer', 'manual_transfer', 'manual_instructor_allocation', 'first_auto_allocation', 'lead_contract_open_to_signed', 'lead_contract_update_data', 'auto_return_stop', 'put_in_pre_hibernation', 'auto_cancel_stop_hibernation', 'put_in_hibernation', 'manual_distribution_after_stop', 'restart_distribution_after_expired', 'cancel_contract', 'discipline_contract_change', 'reallocation', 'change_email', 'contract_start_date_change', 'manual_sign_contract', 'manual_sign_contract_company', 'canceled_stop_cancel_job', 'back_to_manual_teacher_not_found', 'new_auto_allocation', 'move_to_expired_auto_allocation', 'change_contract_option', 'auto_stop', 'student_teacher_request_cancel', 'student_reject_class', 'change_end_of_term', 'user_message');--> statement-breakpoint
CREATE TYPE "public"."student_teacher_request_status" AS ENUM('awaiting', 'requested', 'accepted', 'refused', 'expired');--> statement-breakpoint
CREATE TYPE "public"."student_teacher_request_type" AS ENUM('new_student', 'transfer', 'new_contract', 'reallocation', 'pause_return', 'cancel_return', 'pause_return_automatic', 'hibernation_return');--> statement-breakpoint
CREATE TYPE "public"."student_status" AS ENUM('active', 'inactive', 'blocked');--> statement-breakpoint
CREATE TYPE "public"."teacher_type" AS ENUM('all', 'experimental', 'effective');--> statement-breakpoint
CREATE TYPE "public"."teacher_event_type" AS ENUM('teacher_created', 'new_contract', 'class_reschedule', 'open_contract', 'update_contract_data', 'sign_contract', 'student_reject_class');--> statement-breakpoint
CREATE TYPE "public"."urgency" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."teacher_request_status" AS ENUM('awaiting', 'requested', 'accepted', 'refused', 'expired');--> statement-breakpoint
CREATE TYPE "public"."teacher_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"external_id" text,
	"address_line_1" text,
	"address_line_2" text,
	"suburb" text,
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(2) NOT NULL,
	"postal_code" varchar(20),
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_groups" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_groups_permissions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"permission_group_id" varchar(16) NOT NULL,
	"permission" "permission_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terms_of_use" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"version" varchar(50) NOT NULL,
	"language" "language_type" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terms_of_use_acceptances" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"terms_of_use_id" varchar(16) NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_context_permission_groups" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"permission_group_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_context_roles" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"role" "user_context_role_type" NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "user_contexts" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"invitation_token" varchar(32),
	"invitation_expires_at" timestamp,
	"invitation_confirmed_at" timestamp,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_password_reset" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"token" varchar(32),
	"expires_at" timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '24 hours' NOT NULL,
	"used_at" timestamp,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(100),
	"avatar_id" varchar(16),
	"address_id" varchar(16),
	"document_number" varchar(50),
	"document_type" "document_type",
	"gender" "gender",
	"nationality_id" varchar(16),
	"birthday" timestamp (6) with time zone,
	"primary_phone_country_code" char(4),
	"primary_phone_number" char(20),
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"timezone" varchar(50),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"current_context_id" varchar(16) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"email_confirmed_at" timestamp,
	"user_profile_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "medias" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"type" varchar(128) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"video_link" text,
	"content" text NOT NULL,
	"read_count" integer DEFAULT 0 NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"account_type" integer NOT NULL,
	"agency" varchar(20) NOT NULL,
	"number" varchar(30) NOT NULL,
	"holder_name" varchar(200) NOT NULL,
	"vat_number" varchar(40),
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "banks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(10) NOT NULL,
	"country_id" varchar(16) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"order_index" integer NOT NULL,
	"image_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "collectors" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_admin_id" varchar(16) NOT NULL,
	"daily_to_charge" numeric(18, 2),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "contract_sign_job_controls" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_contract_id" varchar(16),
	"teacher_contract_id" varchar(16),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "contract_tokens" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"token" varchar(100) NOT NULL,
	"student_contract_id" varchar(16),
	"teacher_contract_id" varchar(16),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"nationality" varchar(100) NOT NULL,
	"country_alpha2_code" varchar(4),
	"postal_code_mask" varchar(12),
	"phone_country_code" varchar(4),
	"phone_mask" varchar(20),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(4) NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"country_alpha2_code" varchar(4) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "data_contracts" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"financial_responsible_id" varchar(16),
	"name" varchar(200),
	"email" varchar(200),
	"primary_phone_country_code" char(4),
	"primary_phone_number" char(20),
	"birthday" timestamp,
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"vat_number" char(40),
	"document_type" integer,
	"gender" "gender",
	"is_responsible" boolean NOT NULL,
	"address_id" varchar(16),
	"relationship" varchar(50),
	"nationality_id" varchar(16),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "disciplines" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_responsibles" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"name" varchar(300) NOT NULL,
	"school_registry" char(14) NOT NULL,
	"verification_token" char(10),
	"verified_at" timestamp,
	"send_notifications_block" boolean DEFAULT false NOT NULL,
	"customer_ext_id" varchar(200),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "internal_campaigns" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"url" text,
	"name" varchar(200) NOT NULL,
	"campaign_content" varchar(255),
	"campaign_id" varchar(255),
	"campaign_medium" varchar(255),
	"campaign_name" varchar(255),
	"campaign_term" varchar(255),
	"campaign_source" "campaign_source",
	"seller_id" varchar(16) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoice_itens" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"invoice_id" varchar(16) NOT NULL,
	"student_contract_id" varchar(16),
	"description" varchar(200) NOT NULL,
	"is_credit" boolean NOT NULL,
	"value" numeric(18, 2) NOT NULL,
	"invoice_item_type" "invoice_item_type" NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoice_notes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"invoice_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"due_date" timestamp (6) with time zone NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"invoice_status" "invoice_status" NOT NULL,
	"payment_type" "payment_type" DEFAULT 'payment_link' NOT NULL,
	"paid_at" timestamp (6) with time zone,
	"collector_id" varchar(16),
	"boleto_status" integer,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_activities" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"description" varchar(500) NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"issue_id" varchar(16) NOT NULL,
	"issue_activity_type" "issue_activity_type" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_attachments" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"issue_id" varchar(16) NOT NULL,
	"name" varchar(500) NOT NULL,
	"url" varchar(500) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_comments" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"issue_id" varchar(16) NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"version_implemented" varchar(50),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"description" text NOT NULL,
	"project" varchar(150) NOT NULL,
	"issue_section" "issue_section" NOT NULL,
	"issue_type" "issue_type" NOT NULL,
	"issue_status" "issue_status" NOT NULL,
	"priority" "issue_priority" NOT NULL,
	"created_by_id" varchar(16) NOT NULL,
	"assignee_id" varchar(16),
	"version_implemented" varchar(50),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_import_files" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_admin_id" varchar(16),
	"file_name" varchar(250) NOT NULL,
	"bucket_name" varchar(100) NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"length" bigint NOT NULL,
	"sucess_count" integer NOT NULL,
	"error_count" integer NOT NULL,
	"hash" varchar(255),
	"error_file_path" text,
	"internal_campaign_id" varchar(16),
	"company_id" varchar(16),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_imports" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"lead_import_file_id" varchar(16) NOT NULL,
	"lead_id" varchar(16),
	"status" "lead_import_status" NOT NULL,
	"error" text,
	"line_number" integer,
	"line_text" text,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_notes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"lead_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"user_profile_picture" varchar(250) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_tags" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"color" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_with_tags" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"lead_id" varchar(16) NOT NULL,
	"lead_tag_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"seller_id" varchar(16),
	"company_id" varchar(16),
	"discipline_id" varchar(16),
	"internal_campaign_id" varchar(16),
	"name" varchar(200) NOT NULL,
	"email" varchar(200),
	"primary_phone_country_code" char(4),
	"primary_phone_number" char(20),
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"status" "lead_status" NOT NULL,
	"gender" "gender",
	"reason" integer,
	"is_active_from" boolean NOT NULL,
	"disqualified_type" "disqualified_type",
	"age" "age",
	"click_id" varchar(255),
	"event_source_url" text,
	"fbc" varchar(255),
	"fbp" varchar(255),
	"fb_leads_form" varchar(255),
	"lead_source" integer,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "material_with_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"material_id" varchar(16) NOT NULL,
	"student_class_experimental_feedback_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"file_name" varchar(250) NOT NULL,
	"bucket_name" varchar(100) NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"is_school" boolean NOT NULL,
	"length" varchar(100) NOT NULL,
	"link" text,
	"teacher_id" varchar(16),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "national_holidays" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"type" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"date" timestamp (6) with time zone NOT NULL,
	"is_movable" boolean NOT NULL,
	"country_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "notification_templates" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"subject" text NOT NULL,
	"title" varchar(100) NOT NULL,
	"email_message" text,
	"app_message" varchar(150),
	"zap_template_name" varchar(50),
	"zap_template_data" text,
	"twillio_template_name" varchar(50),
	"type" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"invoice_id" varchar(16) NOT NULL,
	"description" varchar(500) NOT NULL,
	"doc_sent_link" varchar(300),
	"amount" numeric(18, 2) NOT NULL,
	"tid" varchar(200),
	"nsu" varchar(200),
	"url" text,
	"pix_copy_and_paste" text,
	"is_on_sale" boolean NOT NULL,
	"type" "payment_type" NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"origin_paid" varchar(36),
	"due_at" timestamp (6) with time zone,
	"paid_at" timestamp (6) with time zone,
	"is_manual" boolean NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"user_type" integer NOT NULL,
	"token_hash" char(64) NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	"expires_at" timestamp (6) with time zone NOT NULL,
	"revoked_at" timestamp (6) with time zone,
	"replaced_by_token_hash" char(64),
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_admin_id" varchar(16) NOT NULL,
	"type" "report_type" NOT NULL,
	"file_link" text,
	"start_date" timestamp (6) with time zone,
	"end_date" timestamp (6) with time zone,
	"status" "report_status" NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "sellers" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"referral_code" varchar(10) NOT NULL,
	"lead_prefix" varchar(2) NOT NULL,
	"daily_to_sell" numeric(18, 2),
	"daily_experimental_class" integer,
	"pixel_id" text,
	"pixel_secret" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "squad_managers" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"user_admin_id" varchar(16) NOT NULL,
	"squad_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "squads" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"primary_phone_country_code" varchar(4),
	"primary_phone_number" varchar(20),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_cancel_pause_job" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"effective_date" timestamp (6) with time zone NOT NULL,
	"return_date" timestamp (6) with time zone,
	"status" "pause_cancel_status" NOT NULL,
	"type" "pause_cancel_type" NOT NULL,
	"cancel_reason" integer,
	"stop_reason" "stop_reason",
	"keep_teacher" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"external_student_class_id" varchar(36) NOT NULL,
	"user_type" "user_type" NOT NULL,
	"event" "student_class_event_types" NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_class_id" varchar(16),
	"lead_id" varchar(16),
	"level" "level" NOT NULL,
	"rating" integer,
	"description" varchar(500) NOT NULL,
	"requeriment_level" "requeriment_level",
	"reason" "study_reason" NOT NULL,
	"student_specific_condition_id" varchar(16),
	"student_profession_id" varchar(16),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_meet_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_class_id" varchar(16) NOT NULL,
	"user_context_id" varchar(16) NOT NULL,
	"user_type" integer NOT NULL,
	"event_date" timestamp (6) with time zone NOT NULL,
	"type" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_student_feedbacks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_class_id" varchar(16) NOT NULL,
	"teacher_rating" integer NOT NULL,
	"description" text,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_teacher_feedbacks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_class_id" varchar(16) NOT NULL,
	"speak_rating" integer NOT NULL,
	"read_rating" integer NOT NULL,
	"write_rating" integer NOT NULL,
	"lecture_rating" integer NOT NULL,
	"rearing_rating" integer NOT NULL,
	"gramatical_rating" integer NOT NULL,
	"pronunce_rating" integer NOT NULL,
	"vocabulary_rating" integer NOT NULL,
	"description" text,
	"teacher_entity_id" varchar(16),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_classes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"lead_id" varchar(16),
	"student_contract_id" varchar(16),
	"student_id" varchar(16),
	"discipline_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16),
	"class_date" timestamp (6) with time zone NOT NULL,
	"duration" integer NOT NULL,
	"class_link" varchar(500),
	"status" "class_status" NOT NULL,
	"type" "class_type" DEFAULT 'effective' NOT NULL,
	"observation" text,
	"conference_id" varchar(30),
	"event_id" varchar(30),
	"room_id" varchar(30),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_class_options" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_contract_id" varchar(16) NOT NULL,
	"day_of_week" integer NOT NULL,
	"desired_time" time NOT NULL,
	"duration" integer,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_models" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_packages" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"max_value" numeric(18, 2) NOT NULL,
	"min_value" numeric(18, 2) NOT NULL,
	"weekly_class_count" integer NOT NULL,
	"sale_start" timestamp (6) with time zone,
	"sale_end" timestamp (6) with time zone,
	"class_duration" integer NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"rescheduling_limit" integer NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contracts" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16),
	"lead_id" varchar(16),
	"student_contract_model_id" varchar(16) NOT NULL,
	"data_contract_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"start_date" timestamp (6) with time zone NOT NULL,
	"first_payment_date" timestamp (6) with time zone NOT NULL,
	"duration" integer NOT NULL,
	"free_months" integer NOT NULL,
	"paid_months" integer NOT NULL,
	"end_of_term" timestamp (6) with time zone NOT NULL,
	"status" "contract_status" NOT NULL,
	"sign_status" "contract_sign_status" NOT NULL,
	"sign_date" timestamp (6) with time zone,
	"max_value" numeric(18, 2) NOT NULL,
	"value" numeric(18, 2) NOT NULL,
	"level" "level" NOT NULL,
	"payment_type" "payment_type" NOT NULL,
	"is_total_payment" boolean NOT NULL,
	"class_duration" integer NOT NULL,
	"weekly_class_count" integer NOT NULL,
	"weight" numeric(18, 2) NOT NULL,
	"contract_package_snap_shot" json,
	"teacher_id" varchar(16),
	"rescheduling_limit" integer NOT NULL,
	"seller_id" varchar(16),
	"file_link" text,
	"sign_file_link" text,
	"is_native" boolean NOT NULL,
	"is_responsible" boolean DEFAULT false NOT NULL,
	"user_admin_entity_id" varchar(16),
	"min_value" numeric(18, 2),
	"register_value" numeric(18, 2),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_history_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"type" "student_event_type" NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"description" text,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_internal_notes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"user_admin_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_professions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_request_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_request_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_request_types" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"urgency" integer NOT NULL,
	"is_financial" boolean NOT NULL,
	"is_internal" boolean DEFAULT false NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_requests" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"student_request_type_id" varchar(16) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_specific_conditions" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"description" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_observations" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_request_attributes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_teacher_request_id" varchar(16) NOT NULL,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_requests" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16),
	"student_contract_id" varchar(16) NOT NULL,
	"status" "student_teacher_request_status" NOT NULL,
	"type" "student_teacher_request_type" NOT NULL,
	"allocation_quantity" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_terms" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_transfer_reasons" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_with_materials" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"material_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_with_terms" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"student_term_id" varchar(16) NOT NULL,
	"is_accept" boolean NOT NULL,
	"token" varchar(100) NOT NULL,
	"accept_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"status" "student_status" NOT NULL,
	"collector_id" varchar(16),
	"financial_responsible_id" varchar(16),
	"company_id" varchar(16),
	"school_registry" char(14) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_attribute_with_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"student_class_experimental_feedback_id" varchar(16) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_attributes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"can_select" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_availabilities" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_certifications" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"name" varchar(200) NOT NULL,
	"issuing_organization" varchar(200),
	"issued_at" timestamp with time zone,
	"credential_id" varchar(100),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_contract_models" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_courses" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"name" varchar(200) NOT NULL,
	"institution" varchar(200),
	"completed_at" timestamp with time zone,
	"duration" varchar(50),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_contracts" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"teacher_contract_model_id" varchar(16),
	"student_value" numeric(18, 2) NOT NULL,
	"student_native_value" numeric(18, 2) NOT NULL,
	"level" "level" NOT NULL,
	"sign_status" integer NOT NULL,
	"teacher_type" "teacher_type" NOT NULL,
	"data_contract_id" varchar(16),
	"sign_date" timestamp (6) with time zone,
	"end_at" timestamp (6) with time zone,
	"sign_document_link" text,
	"is_native" boolean NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_history_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"type" "teacher_event_type" NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"description" text,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_internal_notes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_request_events" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_request_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_request_types" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"urgency" "urgency" NOT NULL,
	"is_financial" boolean NOT NULL,
	"is_internal" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_requests" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_request_type_id" varchar(16) NOT NULL,
	"status" "teacher_request_status" NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_terms" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_transfer_histories" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"student_transfer_reason_id" varchar(16) NOT NULL,
	"description" varchar(500),
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_with_attributes" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_with_terms" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_term_id" varchar(16) NOT NULL,
	"is_accept" boolean NOT NULL,
	"token" varchar(100) NOT NULL,
	"accept_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"squad_id" varchar(16) NOT NULL,
	"class_link" varchar(300),
	"status" "teacher_status" NOT NULL,
	"bank_account_id" varchar(16),
	"school_registry" char(14) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "permission_groups_permissions" ADD CONSTRAINT "permission_groups_permissions_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "public"."permission_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" ADD CONSTRAINT "terms_of_use_acceptances_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" ADD CONSTRAINT "terms_of_use_acceptances_terms_of_use_id_fkey" FOREIGN KEY ("terms_of_use_id") REFERENCES "public"."terms_of_use"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_context_permission_groups" ADD CONSTRAINT "user_context_permission_groups_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_context_permission_groups" ADD CONSTRAINT "user_context_permission_groups_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "public"."permission_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_context_roles" ADD CONSTRAINT "user_context_roles_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_contexts" ADD CONSTRAINT "user_contexts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_password_reset" ADD CONSTRAINT "password_reset_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "public"."medias"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_current_context_id_fkey" FOREIGN KEY ("current_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract_sign_job_controls" ADD CONSTRAINT "contract_sign_job_controls__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract_sign_job_controls" ADD CONSTRAINT "contract_sign_job_controls__teacher_contract_id_fkey" FOREIGN KEY ("teacher_contract_id") REFERENCES "public"."teacher_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract_tokens" ADD CONSTRAINT "contract_tokens__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract_tokens" ADD CONSTRAINT "contract_tokens__teacher_contract_id_fkey" FOREIGN KEY ("teacher_contract_id") REFERENCES "public"."teacher_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_contracts" ADD CONSTRAINT "data_contracts__address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_contracts" ADD CONSTRAINT "data_contracts__nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_itens" ADD CONSTRAINT "invoice_itens__invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_itens" ADD CONSTRAINT "invoice_itens__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_notes" ADD CONSTRAINT "invoice_notes_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "public"."collectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_activities" ADD CONSTRAINT "issue_activities_fkey" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_activities" ADD CONSTRAINT "issue_activities_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_attachments" ADD CONSTRAINT "issue_attachments_fkey" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_comments" ADD CONSTRAINT "issue_comments_fkey" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_comments" ADD CONSTRAINT "issue_comments_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_import_files" ADD CONSTRAINT "lead_import_files__internal_campaign_id_fkey" FOREIGN KEY ("internal_campaign_id") REFERENCES "public"."internal_campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_imports" ADD CONSTRAINT "lead_imports__lead_import_file_id_fkey" FOREIGN KEY ("lead_import_file_id") REFERENCES "public"."lead_import_files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_imports" ADD CONSTRAINT "lead_imports__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_with_tags" ADD CONSTRAINT "lead_with_tags__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_with_tags" ADD CONSTRAINT "lead_with_tags__lead_tag_id_fkey" FOREIGN KEY ("lead_tag_id") REFERENCES "public"."lead_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__internal_campaign_id_fkey" FOREIGN KEY ("internal_campaign_id") REFERENCES "public"."internal_campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_with_experimental_feedbacks" ADD CONSTRAINT "mwef_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material_with_experimental_feedbacks" ADD CONSTRAINT "mwef_scef_id_fkey" FOREIGN KEY ("student_class_experimental_feedback_id") REFERENCES "public"."student_class_experimental_feedbacks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "national_holidays" ADD CONSTRAINT "national_holidays_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sellers" ADD CONSTRAINT "sellers_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "squad_managers" ADD CONSTRAINT "squad_managers_fkey" FOREIGN KEY ("squad_id") REFERENCES "public"."squads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_cancel_pause_job" ADD CONSTRAINT "student_cancel_pause_job_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_events" ADD CONSTRAINT "student_class_events_user_context_id_user_contexts_id_fk" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "public"."student_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_student_profession_id_fkey" FOREIGN KEY ("student_profession_id") REFERENCES "public"."student_professions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_ssc_id_fkey" FOREIGN KEY ("student_specific_condition_id") REFERENCES "public"."student_specific_conditions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_meet_events" ADD CONSTRAINT "student_class_meet_events_fkey" FOREIGN KEY ("student_class_id") REFERENCES "public"."student_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_meet_events" ADD CONSTRAINT "student_class_meet_events_user_context_id_fkey" FOREIGN KEY ("user_context_id") REFERENCES "public"."user_contexts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_student_feedbacks" ADD CONSTRAINT "student_class_student_feedbacks_fkey" FOREIGN KEY ("student_class_id") REFERENCES "public"."student_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_teacher_feedbacks" ADD CONSTRAINT "student_class_teacher_feedbacks__student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "public"."student_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class_teacher_feedbacks" ADD CONSTRAINT "student_class_teacher_feedbacks__teacher_entity_id_fkey" FOREIGN KEY ("teacher_entity_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contract_class_options" ADD CONSTRAINT "student_contract_class_options_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contract_packages" ADD CONSTRAINT "student_contract_packages__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contract_packages" ADD CONSTRAINT "student_contract_packages__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__data_contract_id_fkey" FOREIGN KEY ("data_contract_id") REFERENCES "public"."data_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__student_contract_model_id_fkey" FOREIGN KEY ("student_contract_model_id") REFERENCES "public"."student_contract_models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_history_events" ADD CONSTRAINT "student_history_events_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_internal_notes" ADD CONSTRAINT "student_internal_notes_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_request_events" ADD CONSTRAINT "student_request_events_fkey" FOREIGN KEY ("student_request_id") REFERENCES "public"."student_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_requests" ADD CONSTRAINT "student_requests__student_request_type_id_fkey" FOREIGN KEY ("student_request_type_id") REFERENCES "public"."student_request_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_requests" ADD CONSTRAINT "student_requests__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_observations" ADD CONSTRAINT "student_teacher_observations__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_observations" ADD CONSTRAINT "student_teacher_observations__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_request_attributes" ADD CONSTRAINT "stra_str_id_fkey" FOREIGN KEY ("student_teacher_request_id") REFERENCES "public"."student_teacher_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_request_attributes" ADD CONSTRAINT "stra_ta_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "public"."teacher_attributes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "public"."student_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_with_materials" ADD CONSTRAINT "student_with_materials__material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_with_materials" ADD CONSTRAINT "student_with_materials__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_with_terms" ADD CONSTRAINT "student_with_terms__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_with_terms" ADD CONSTRAINT "student_with_terms__student_term_id_fkey" FOREIGN KEY ("student_term_id") REFERENCES "public"."student_terms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "public"."collectors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__financial_responsible_id_fkey" FOREIGN KEY ("financial_responsible_id") REFERENCES "public"."financial_responsibles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_attribute_with_experimental_feedbacks" ADD CONSTRAINT "tawef_scef_id_fkey" FOREIGN KEY ("student_class_experimental_feedback_id") REFERENCES "public"."student_class_experimental_feedbacks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_attribute_with_experimental_feedbacks" ADD CONSTRAINT "tawef_ta_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "public"."teacher_attributes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_availabilities" ADD CONSTRAINT "teacher_availabilities_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_certifications" ADD CONSTRAINT "teacher_certifications__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_courses" ADD CONSTRAINT "teacher_courses__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__data_contract_id_fkey" FOREIGN KEY ("data_contract_id") REFERENCES "public"."data_contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__teacher_contract_model_id_fkey" FOREIGN KEY ("teacher_contract_model_id") REFERENCES "public"."teacher_contract_models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_history_events" ADD CONSTRAINT "teacher_history_events_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_internal_notes" ADD CONSTRAINT "teacher_internal_notes_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_request_events" ADD CONSTRAINT "teacher_request_events_fkey" FOREIGN KEY ("teacher_request_id") REFERENCES "public"."teacher_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_requests" ADD CONSTRAINT "teacher_requests__teacher_request_type_id_fkey" FOREIGN KEY ("teacher_request_type_id") REFERENCES "public"."teacher_request_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_requests" ADD CONSTRAINT "teacher_requests__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__student_transfer_reason_id_fkey" FOREIGN KEY ("student_transfer_reason_id") REFERENCES "public"."student_transfer_reasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_with_attributes" ADD CONSTRAINT "teacher_with_attributes__teacher_attribute_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "public"."teacher_attributes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_with_attributes" ADD CONSTRAINT "teacher_with_attributes__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_with_terms" ADD CONSTRAINT "teacher_with_terms__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_with_terms" ADD CONSTRAINT "teacher_with_terms__teacher_term_id_fkey" FOREIGN KEY ("teacher_term_id") REFERENCES "public"."teacher_terms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "public"."squads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "permission_groups_name_key" ON "permission_groups" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "terms_of_use_version_language_key" ON "terms_of_use" USING btree ("version","language");--> statement-breakpoint
CREATE UNIQUE INDEX "ucpg_user_context_permission_group_uk" ON "user_context_permission_groups" USING btree ("user_context_id","permission_group_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_context_roles_role_user_context_id_key" ON "user_context_roles" USING btree ("role","user_context_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_contexts_invitation_token_key" ON "user_contexts" USING btree ("invitation_token");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_token_key" ON "user_password_reset" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "user_profiles_document_number_type_key" ON "user_profiles" USING btree ("document_number","document_type");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "articles__title_idx" ON "articles" USING btree ("title");--> statement-breakpoint
CREATE INDEX "banks__country_id_idx" ON "banks" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "books__order_index_idx" ON "books" USING btree ("order_index");--> statement-breakpoint
CREATE INDEX "contract_sign_job_controls__student_contract_id_idx" ON "contract_sign_job_controls" USING btree ("student_contract_id");--> statement-breakpoint
CREATE INDEX "contract_sign_job_controls__teacher_contract_id_idx" ON "contract_sign_job_controls" USING btree ("teacher_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contract_tokens__student_contract_id_key" ON "contract_tokens" USING btree ("student_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contract_tokens__teacher_contract_id_key" ON "contract_tokens" USING btree ("teacher_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "countries__name_key" ON "countries" USING btree ("name");--> statement-breakpoint
CREATE INDEX "currencies_deleted_at_idx" ON "currencies" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "data_contracts__address_id_idx" ON "data_contracts" USING btree ("address_id");--> statement-breakpoint
CREATE INDEX "data_contracts__financial_responsible_id_idx" ON "data_contracts" USING btree ("financial_responsible_id");--> statement-breakpoint
CREATE INDEX "data_contracts__nationality_id_idx" ON "data_contracts" USING btree ("nationality_id");--> statement-breakpoint
CREATE UNIQUE INDEX "disciplines__name_key" ON "disciplines" USING btree ("name");--> statement-breakpoint
CREATE INDEX "internal_campaigns__seller_id_idx" ON "internal_campaigns" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "idx_invoiceitem_invoiceid_removedat" ON "invoice_itens" USING btree ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "idx_invoiceitens_invoice_removed" ON "invoice_itens" USING btree ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "invoice_itens__invoice_id_idx" ON "invoice_itens" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "invoice_itens__student_contract_id_idx" ON "invoice_itens" USING btree ("student_contract_id");--> statement-breakpoint
CREATE INDEX "idx_invoicenotes_invoiceid_removedat" ON "invoice_notes" USING btree ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "invoice_notes__invoice_id_idx" ON "invoice_notes" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "idx_invoices_grid" ON "invoices" USING btree ("deleted_at","due_date");--> statement-breakpoint
CREATE INDEX "invoices__collector_id_idx" ON "invoices" USING btree ("collector_id");--> statement-breakpoint
CREATE INDEX "invoices__currency_id_idx" ON "invoices" USING btree ("currency_id");--> statement-breakpoint
CREATE INDEX "invoices__student_id_idx" ON "invoices" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "issue_activities__issue_id_idx" ON "issue_activities" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_activities__user_context_id_idx" ON "issue_activities" USING btree ("user_context_id");--> statement-breakpoint
CREATE INDEX "issue_attachments__issue_id_idx" ON "issue_attachments" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_comments__issue_id_idx" ON "issue_comments" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_comments__user_context_id_idx" ON "issue_comments" USING btree ("user_context_id");--> statement-breakpoint
CREATE INDEX "issues__assignee_id_idx" ON "issues" USING btree ("assignee_id");--> statement-breakpoint
CREATE INDEX "issues__created_by_id_idx" ON "issues" USING btree ("created_by_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__company_id_idx" ON "lead_import_files" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__internal_campaign_id_idx" ON "lead_import_files" USING btree ("internal_campaign_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__user_admin_id_idx" ON "lead_import_files" USING btree ("user_admin_id");--> statement-breakpoint
CREATE INDEX "lead_imports__lead_id_idx" ON "lead_imports" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "lead_imports__lead_import_file_id_idx" ON "lead_imports" USING btree ("lead_import_file_id");--> statement-breakpoint
CREATE INDEX "lead_notes__lead_id_idx" ON "lead_notes" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "lead_tags_deleted_at_idx" ON "lead_tags" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "lead_with_tags__lead_id__lead_tag_id_key" ON "lead_with_tags" USING btree ("lead_id","lead_tag_id");--> statement-breakpoint
CREATE INDEX "lead_with_tags__lead_tag_id_idx" ON "lead_with_tags" USING btree ("lead_tag_id");--> statement-breakpoint
CREATE INDEX "lead_with_tags_deleted_at_idx" ON "lead_with_tags" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "leads__company_id_idx" ON "leads" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "leads__discipline_id_idx" ON "leads" USING btree ("discipline_id");--> statement-breakpoint
CREATE INDEX "leads__internal_campaign_id_idx" ON "leads" USING btree ("internal_campaign_id");--> statement-breakpoint
CREATE INDEX "leads_deleted_at_idx" ON "leads" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "leads__seller_id_idx" ON "leads" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "leads__full_idx" ON "leads" USING btree ("name","email","primary_phone_number","primary_phone_country_code");--> statement-breakpoint
CREATE UNIQUE INDEX "mwef_material_scef_uk" ON "material_with_experimental_feedbacks" USING btree ("material_id","student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "mwef_deleted_at_idx" ON "material_with_experimental_feedbacks" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "mwef_scef_id_idx" ON "material_with_experimental_feedbacks" USING btree ("student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "materials_deleted_at_idx" ON "materials" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "materials__teacher_id_idx" ON "materials" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "national_holidays__country_id_idx" ON "national_holidays" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "national_holidays__type_idx" ON "national_holidays" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "national_holidays__country_id_date_name_key" ON "national_holidays" USING btree ("country_id","date","name");--> statement-breakpoint
CREATE UNIQUE INDEX "notification_templates__name_key" ON "notification_templates" USING btree ("name");--> statement-breakpoint
CREATE INDEX "notification_templates_deleted_at_idx" ON "notification_templates" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "idx_payments_invoice_status" ON "payments" USING btree ("invoice_id","status","deleted_at");--> statement-breakpoint
CREATE INDEX "idx_payments_invoice_status_removed" ON "payments" USING btree ("invoice_id","status","deleted_at");--> statement-breakpoint
CREATE INDEX "payments__invoice_id_idx" ON "payments" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "payments_deleted_at_idx" ON "payments" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_tokens__token_hash_key" ON "refresh_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "refresh_tokens__user_type__user_context_id__revoked_at__expires_at_idx" ON "refresh_tokens" USING btree ("user_type","user_context_id","revoked_at","expires_at");--> statement-breakpoint
CREATE INDEX "refresh_tokens__user_type__user_name_idx" ON "refresh_tokens" USING btree ("user_type","user_name");--> statement-breakpoint
CREATE INDEX "reports_deleted_at_idx" ON "reports" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "squad_managers_deleted_at_idx" ON "squad_managers" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "squad_managers__squad_id_idx" ON "squad_managers" USING btree ("squad_id");--> statement-breakpoint
CREATE UNIQUE INDEX "squads__name_key" ON "squads" USING btree ("name");--> statement-breakpoint
CREATE INDEX "squads_deleted_at_idx" ON "squads" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_cancel_pause_job_deleted_at_idx" ON "student_cancel_pause_job" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_cancel_pause_job__student_id_idx" ON "student_cancel_pause_job" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_class_events_deleted_at_idx" ON "student_class_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "scef_lead_id_key" ON "student_class_experimental_feedbacks" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "scef_deleted_at_idx" ON "student_class_experimental_feedbacks" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "scef_student_class_id_key" ON "student_class_experimental_feedbacks" USING btree ("student_class_id");--> statement-breakpoint
CREATE INDEX "scef_student_profession_id_idx" ON "student_class_experimental_feedbacks" USING btree ("student_profession_id");--> statement-breakpoint
CREATE INDEX "scef_ssc_id_idx" ON "student_class_experimental_feedbacks" USING btree ("student_specific_condition_id");--> statement-breakpoint
CREATE INDEX "student_class_meet_events_deleted_at_idx" ON "student_class_meet_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_class_meet_events__student_class_id_idx" ON "student_class_meet_events" USING btree ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_student_feedbacks_deleted_at_idx" ON "student_class_student_feedbacks" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "student_class_student_feedbacks__student_class_id_key" ON "student_class_student_feedbacks" USING btree ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_teacher_feedbacks_deleted_at_idx" ON "student_class_teacher_feedbacks" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "student_class_teacher_feedbacks__student_class_id_key" ON "student_class_teacher_feedbacks" USING btree ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_teacher_feedbacks__teacher_entity_id_idx" ON "student_class_teacher_feedbacks" USING btree ("teacher_entity_id");--> statement-breakpoint
CREATE INDEX "student_classes__id_idx" ON "student_classes" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_studentclass_id_classlink_removed" ON "student_classes" USING btree ("id","class_link","deleted_at");--> statement-breakpoint
CREATE INDEX "classes__student__status__date__time_idx" ON "student_classes" USING btree ("student_id","status","class_date");--> statement-breakpoint
CREATE INDEX "student_classes__discipline_id_idx" ON "student_classes" USING btree ("discipline_id");--> statement-breakpoint
CREATE INDEX "student_classes__student_contract_id_idx" ON "student_classes" USING btree ("student_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_classes__lead_id_key" ON "student_classes" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "student_classes_deleted_at_idx" ON "student_classes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_classes__student_id_idx" ON "student_classes" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_classes__teacher_id_idx" ON "student_classes" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_classes__teacher_id__status_idx" ON "student_classes" USING btree ("teacher_id","status");--> statement-breakpoint
CREATE INDEX "sclass_teacher_status_date_start_idx" ON "student_classes" USING btree ("teacher_id","status","class_date");--> statement-breakpoint
CREATE INDEX "student_contract_class_options_deleted_at_idx" ON "student_contract_class_options" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contract_class_options__student_contract_id_idx" ON "student_contract_class_options" USING btree ("student_contract_id");--> statement-breakpoint
CREATE INDEX "student_contract_models_deleted_at_idx" ON "student_contract_models" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contract_packages__currency_id_idx" ON "student_contract_packages" USING btree ("currency_id");--> statement-breakpoint
CREATE INDEX "student_contract_packages__discipline_id_idx" ON "student_contract_packages" USING btree ("discipline_id");--> statement-breakpoint
CREATE INDEX "student_contract_packages_deleted_at_idx" ON "student_contract_packages" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contracts__currency_id_idx" ON "student_contracts" USING btree ("currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_contracts__data_contract_id_key" ON "student_contracts" USING btree ("data_contract_id");--> statement-breakpoint
CREATE INDEX "student_contracts__discipline_id_idx" ON "student_contracts" USING btree ("discipline_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_contracts__lead_id_key" ON "student_contracts" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "student_contracts_deleted_at_idx" ON "student_contracts" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contracts__seller_id_idx" ON "student_contracts" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "student_contracts__student_contract_model_id_idx" ON "student_contracts" USING btree ("student_contract_model_id");--> statement-breakpoint
CREATE INDEX "student_contracts__student_id_idx" ON "student_contracts" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_contracts__teacher_id_idx" ON "student_contracts" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_history_events_deleted_at_idx" ON "student_history_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_history_events__student_id_idx" ON "student_history_events" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_internal_notes_deleted_at_idx" ON "student_internal_notes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_internal_notes__student_id_idx" ON "student_internal_notes" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_professions_deleted_at_idx" ON "student_professions" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_request_events_deleted_at_idx" ON "student_request_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_request_events__student_request_id_idx" ON "student_request_events" USING btree ("student_request_id");--> statement-breakpoint
CREATE INDEX "student_request_types_deleted_at_idx" ON "student_request_types" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_requests_deleted_at_idx" ON "student_requests" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_requests__student_id_idx" ON "student_requests" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_requests__student_request_type_id_idx" ON "student_requests" USING btree ("student_request_type_id");--> statement-breakpoint
CREATE INDEX "student_specific_conditions_deleted_at_idx" ON "student_specific_conditions" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_observations_deleted_at_idx" ON "student_teacher_observations" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_observations__student_id_idx" ON "student_teacher_observations" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_teacher_observations__teacher_id_idx" ON "student_teacher_observations" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "stra_deleted_at_idx" ON "student_teacher_request_attributes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "stra_str_id_idx" ON "student_teacher_request_attributes" USING btree ("student_teacher_request_id");--> statement-breakpoint
CREATE INDEX "stra_ta_id_idx" ON "student_teacher_request_attributes" USING btree ("teacher_attribute_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests_deleted_at_idx" ON "student_teacher_requests" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__student_contract_id_idx" ON "student_teacher_requests" USING btree ("student_contract_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__student_id_idx" ON "student_teacher_requests" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__teacher_id_idx" ON "student_teacher_requests" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_terms_deleted_at_idx" ON "student_terms" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_transfer_reasons_deleted_at_idx" ON "student_transfer_reasons" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_materials__material_id_idx" ON "student_with_materials" USING btree ("material_id");--> statement-breakpoint
CREATE INDEX "student_with_materials_deleted_at_idx" ON "student_with_materials" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_materials__student_id_idx" ON "student_with_materials" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_with_terms_deleted_at_idx" ON "student_with_terms" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_terms__student_id_idx" ON "student_with_terms" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_with_terms__student_term_id_idx" ON "student_with_terms" USING btree ("student_term_id");--> statement-breakpoint
CREATE INDEX "students__collector_id_idx" ON "students" USING btree ("collector_id");--> statement-breakpoint
CREATE INDEX "students__company_id_idx" ON "students" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "students__financial_responsible_id_idx" ON "students" USING btree ("financial_responsible_id");--> statement-breakpoint
CREATE INDEX "students_deleted_at_idx" ON "students" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "tawef_deleted_at_idx" ON "teacher_attribute_with_experimental_feedbacks" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "tawef_scef_id_idx" ON "teacher_attribute_with_experimental_feedbacks" USING btree ("student_class_experimental_feedback_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tawef_ta_scef_uk" ON "teacher_attribute_with_experimental_feedbacks" USING btree ("teacher_attribute_id","student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "teacher_attributes_deleted_at_idx" ON "teacher_attributes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_availabilities_deleted_at_idx" ON "teacher_availabilities" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_availabilities__teacher_id_idx" ON "teacher_availabilities" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_certifications_deleted_at_idx" ON "teacher_certifications" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_certifications__teacher_id_idx" ON "teacher_certifications" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_contract_models_deleted_at_idx" ON "teacher_contract_models" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_courses_deleted_at_idx" ON "teacher_courses" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_courses__teacher_id_idx" ON "teacher_courses" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts__data_contract_id_idx" ON "teacher_contracts" USING btree ("data_contract_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts__discipline_id_idx" ON "teacher_contracts" USING btree ("discipline_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts_deleted_at_idx" ON "teacher_contracts" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_contracts__teacher_contract_model_id_idx" ON "teacher_contracts" USING btree ("teacher_contract_model_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts__teacher_id_idx" ON "teacher_contracts" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_history_events_deleted_at_idx" ON "teacher_history_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_history_events__teacher_id_idx" ON "teacher_history_events" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_internal_notes_deleted_at_idx" ON "teacher_internal_notes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_internal_notes__teacher_id_idx" ON "teacher_internal_notes" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_request_events_deleted_at_idx" ON "teacher_request_events" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_request_events__teacher_request_id_idx" ON "teacher_request_events" USING btree ("teacher_request_id");--> statement-breakpoint
CREATE INDEX "teacher_request_types_deleted_at_idx" ON "teacher_request_types" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_requests_deleted_at_idx" ON "teacher_requests" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_requests__teacher_id_idx" ON "teacher_requests" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_requests__teacher_request_type_id_idx" ON "teacher_requests" USING btree ("teacher_request_type_id");--> statement-breakpoint
CREATE INDEX "teacher_terms_deleted_at_idx" ON "teacher_terms" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories_deleted_at_idx" ON "teacher_transfer_histories" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__student_id_idx" ON "teacher_transfer_histories" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__student_transfer_reason_id_idx" ON "teacher_transfer_histories" USING btree ("student_transfer_reason_id");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__teacher_id_idx" ON "teacher_transfer_histories" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes_deleted_at_idx" ON "teacher_with_attributes" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes__teacher_attribute_id_idx" ON "teacher_with_attributes" USING btree ("teacher_attribute_id");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes__teacher_id_idx" ON "teacher_with_attributes" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_terms_deleted_at_idx" ON "teacher_with_terms" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_with_terms__teacher_id_idx" ON "teacher_with_terms" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_terms__teacher_term_id_idx" ON "teacher_with_terms" USING btree ("teacher_term_id");--> statement-breakpoint
CREATE INDEX "teachers__bank_account_id_idx" ON "teachers" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "teachers_deleted_at_idx" ON "teachers" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "teachers__squad_id_idx" ON "teachers" USING btree ("squad_id");