CREATE TYPE "document_type" AS ENUM('cpf', 'cnpj', 'tax_id');--> statement-breakpoint
CREATE TYPE "gender" AS ENUM('unknown', 'masculine', 'feminine');--> statement-breakpoint
CREATE TYPE "language_type" AS ENUM('en', 'pt', 'es');--> statement-breakpoint
CREATE TYPE "level" AS ENUM('basic_i', 'basic_ii', 'pre_intermediate', 'intermediate', 'upper_intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "payment_type" AS ENUM('payment_link', 'bank_transfer', 'paypal', 'mercado_livre', 'zelle', 'venmo');--> statement-breakpoint
CREATE TYPE "permission_type" AS ENUM('full', 'users_view', 'users_edit', 'users_create', 'users_delete', 'permissions_view', 'permissions_edit', 'permissions_create', 'permissions_delete', 'lead_view', 'lead_edit', 'lead_create', 'lead_import', 'lead_delete');--> statement-breakpoint
CREATE TYPE "student_status" AS ENUM('active', 'inactive', 'blocked');--> statement-breakpoint
CREATE TYPE "tenant_role_type" AS ENUM('system_admin', 'alianza_admin');--> statement-breakpoint
CREATE TYPE "user_type" AS ENUM('student', 'teacher', 'financial_responsible', 'alianza');--> statement-breakpoint
CREATE TYPE "campaign_source" AS ENUM('facebook', 'messenger', 'instagram', 'direct', 'google', 'tiktok', 'youtube', 'blog', 'email', 'indication', 'company', 'affiliate', 'influencer', 'student_indication', 'fb_forms', 'ex_student', 'campaign');--> statement-breakpoint
CREATE TYPE "invoice_item_type" AS ENUM('first_payment', 'month_due', 'renew_contract', 'free_month', 'other', 'indication', 'taxes', 'discount', 'refund', 'promotion', 'promotion_credit', 'pause_credit', 'register_payment');--> statement-breakpoint
CREATE TYPE "invoice_status" AS ENUM('charge', 'waiting_payment', 'late_payment', 'paid', 'canceled', 'unpaid', 'refunded', 'partial_paid', 'late_paid');--> statement-breakpoint
CREATE TYPE "issue_activity_type" AS ENUM('create', 'update', 'delete', 'comment', 'comment_mention', 'assign', 'attach', 'detach', 'status_change', 'priority_change', 'new_release');--> statement-breakpoint
CREATE TYPE "issue_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "issue_section" AS ENUM('commerce', 'pedagogic', 'financial', 'marketing', 'experimental_class');--> statement-breakpoint
CREATE TYPE "issue_status" AS ENUM('open', 'in_progress', 'on_hold', 'resolved', 'closed', 'awaiting_approval');--> statement-breakpoint
CREATE TYPE "issue_type" AS ENUM('bug', 'feature_request', 'improvement', 'questions', 'permission');--> statement-breakpoint
CREATE TYPE "lead_import_status" AS ENUM('pending', 'processed', 'failed', 'partial');--> statement-breakpoint
CREATE TYPE "age" AS ENUM('under_12', 'from_12_to_18', 'from_18_to_22', 'from_22_to_28', 'from_28_to_40', 'from_40_to_65', 'older_65');--> statement-breakpoint
CREATE TYPE "disqualified_type" AS ENUM('profile_invalid', 'phone_number_replicate', 'phone_number_non_existent', 'student_not_answer');--> statement-breakpoint
CREATE TYPE "lead_reschedule_reason" AS ENUM('lead_not_confirmed_experimental_class', 'requested_reschedule_due_to_unforeseen');--> statement-breakpoint
CREATE TYPE "lead_status" AS ENUM('pre_analisys', 'created', 'in_service', 'experimental_class', 'experimental_class_missed', 'feedback', 'contract', 'waiting_payment', 'paid', 'talk_later', 'disqualified');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('pending', 'paid', 'canceled', 'refunded', 'overdue');--> statement-breakpoint
CREATE TYPE "report_status" AS ENUM('to_do', 'doing', 'error', 'done');--> statement-breakpoint
CREATE TYPE "report_type" AS ENUM('students', 'invoices_by_collector', 'invoices', 'requests', 'experimental_classes', 'classes', 'instructor_close_month');--> statement-breakpoint
CREATE TYPE "pause_cancel_status" AS ENUM('awaiting', 'in_stop', 'returned', 'student_canceled', 'canceled');--> statement-breakpoint
CREATE TYPE "pause_cancel_type" AS ENUM('to_stop', 'to_cancel');--> statement-breakpoint
CREATE TYPE "stop_reason" AS ENUM('work', 'personal_reasons', 'travel', 'other_studies', 'holidays', 'lack_of_time');--> statement-breakpoint
CREATE TYPE "requeriment_level" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "study_reason" AS ENUM('work', 'travel', 'apprenticeship', 'other');--> statement-breakpoint
CREATE TYPE "class_status" AS ENUM('scheduled', 'completed', 'missed_student', 'canceled', 'refunded', 'missed_teacher', 'awaiting_student_approval', 'student_reject', 'completed_holiday');--> statement-breakpoint
CREATE TYPE "class_type" AS ENUM('effective', 'experimental');--> statement-breakpoint
CREATE TYPE "cancel_reason" AS ENUM('teacher', 'methodology', 'default', 'personal', 'financial', 'cdc', 'did_not_want_to_renew', 'did_not_start');--> statement-breakpoint
CREATE TYPE "contract_sign_status" AS ENUM('waiting_sign', 'opened', 'in_progress', 'update_data', 'signed');--> statement-breakpoint
CREATE TYPE "contract_status" AS ENUM('blocked', 'active', 'canceled');--> statement-breakpoint
CREATE TYPE "student_event_type" AS ENUM('student_registered', 'transfer_request', 'add_collector', 'reactivate_student', 'collector_removed', 'collector_removed_inative', 'change_new_class_in_app', 'student_waiting_instructor', 'instructor_accept_request', 'instructor_refuse_request', 'instructor_transfer_solicitation', 'invoice_paid', 'student_blocked', 'student_completed_class', 'instructor_inactivation', 'student_missed_class', 'financial_message', 'student_cancel_request', 'student_pause_request', 'student_paused', 'student_reactivated', 'student_canceled', 'lead_disqualified', 'lead_transfer_seller', 'lead_contract_signed', 'experimental_class_rescheduled', 'contract_create', 'seller_cancel_request', 'class_reschedule', 'class_completed_manual', 'class_missed_manual', 'class_canceled_manual', 'class_refunded_manual', 'class_missed_instructor_manual', 'class_awaiting_student_approve_manual', 'class_created_manual', 'class_edited_manual', 'instructor_not_approve_in_time', 'return_auto_transfer', 'move_to_manual_transfer', 'manual_transfer', 'manual_instructor_allocation', 'first_auto_allocation', 'lead_contract_open_to_signed', 'lead_contract_update_data', 'auto_return_stop', 'put_in_pre_hibernation', 'auto_cancel_stop_hibernation', 'put_in_hibernation', 'manual_distribution_after_stop', 'restart_distribution_after_expired', 'cancel_contract', 'discipline_contract_change', 'reallocation', 'change_email', 'contract_start_date_change', 'manual_sign_contract', 'manual_sign_contract_company', 'canceled_stop_cancel_job', 'back_to_manual_teacher_not_found', 'new_auto_allocation', 'move_to_expired_auto_allocation', 'change_contract_option', 'auto_stop', 'student_teacher_request_cancel', 'student_reject_class', 'change_end_of_term', 'user_message');--> statement-breakpoint
CREATE TYPE "student_teacher_request_status" AS ENUM('awaiting', 'requested', 'accepted', 'refused', 'expired');--> statement-breakpoint
CREATE TYPE "student_teacher_request_type" AS ENUM('new_student', 'transfer', 'new_contract', 'reallocation', 'pause_return', 'cancel_return', 'pause_return_automatic', 'hibernation_return');--> statement-breakpoint
CREATE TYPE "teacher_type" AS ENUM('all', 'experimental', 'effective');--> statement-breakpoint
CREATE TYPE "teacher_event_type" AS ENUM('teacher_created', 'new_contract', 'class_reschedule', 'open_contract', 'update_contract_data', 'sign_contract', 'student_reject_class');--> statement-breakpoint
CREATE TYPE "urgency" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "teacher_request_status" AS ENUM('awaiting', 'requested', 'accepted', 'refused', 'expired');--> statement-breakpoint
CREATE TYPE "teacher_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" varchar(16) PRIMARY KEY,
	"external_id" text,
	"address_line_1" text,
	"address_line_2" text,
	"suburb" text,
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(2) NOT NULL,
	"postal_code" varchar(20),
	"latitude" numeric(10,8),
	"longitude" numeric(11,8),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_groups" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"tenant_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_groups_permissions" (
	"id" varchar(16) PRIMARY KEY,
	"permission_group_id" varchar(16) NOT NULL,
	"permission" "permission_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_profiles" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"legal_name" varchar(100),
	"website" varchar(255),
	"avatar_id" varchar(16),
	"address_id" varchar(16),
	"document_number" varchar(50),
	"document_type" "document_type",
	"contact_first_name" varchar(100),
	"contact_last_name" varchar(100),
	"contact_email" varchar(255),
	"phone" varchar(50),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_roles" (
	"id" varchar(16) PRIMARY KEY,
	"role" "tenant_role_type" NOT NULL,
	"tenant_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" varchar(16) PRIMARY KEY,
	"tenant_profile_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "terms_of_use" (
	"id" varchar(16) PRIMARY KEY,
	"version" varchar(50) NOT NULL,
	"language" "language_type" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terms_of_use_acceptances" (
	"id" varchar(16) PRIMARY KEY,
	"user_id" varchar(16) NOT NULL,
	"terms_of_use_id" varchar(16) NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_password_reset" (
	"id" varchar(16) PRIMARY KEY,
	"user_id" varchar(16) NOT NULL,
	"token" varchar(32),
	"expires_at" timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '24 hours' NOT NULL,
	"used_at" timestamp,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" varchar(16) PRIMARY KEY,
	"first_name" varchar(50),
	"last_name" varchar(100),
	"avatar_id" varchar(16),
	"address_id" varchar(16),
	"document_number" varchar(50),
	"document_type" "document_type",
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" varchar(16) PRIMARY KEY,
	"user_id" varchar(16) NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"current_tenant_id" varchar(16) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_tenant_permission_groups" (
	"id" varchar(16) PRIMARY KEY,
	"user_tenant_id" varchar(16) NOT NULL,
	"permission_group_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_tenants" (
	"id" varchar(16) PRIMARY KEY,
	"tenant_id" varchar(16) NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"invitation_token" varchar(32),
	"invitation_expires_at" timestamp,
	"invitation_confirmed_at" timestamp,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(16) PRIMARY KEY,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"email_confirmed_at" timestamp,
	"user_profile_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "medias" (
	"id" varchar(16) PRIMARY KEY,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"type" varchar(128) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" varchar(16) PRIMARY KEY,
	"title" varchar(100) NOT NULL,
	"video_link" text,
	"content" text NOT NULL,
	"read_count" integer DEFAULT 0 NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" varchar(16) PRIMARY KEY,
	"account_type" integer NOT NULL,
	"agency" varchar(20) NOT NULL,
	"number" varchar(30) NOT NULL,
	"holder_name" varchar(200) NOT NULL,
	"vat_number" varchar(40),
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "banks" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(200) NOT NULL,
	"code" varchar(10) NOT NULL,
	"country_id" varchar(16) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" varchar(16) PRIMARY KEY,
	"title" varchar(200) NOT NULL,
	"description" text,
	"order_index" integer NOT NULL,
	"image_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "collectors" (
	"id" varchar(16) PRIMARY KEY,
	"user_admin_id" varchar(16) NOT NULL,
	"daily_to_charge" numeric(18,2),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "contract_sign_job_controls" (
	"id" varchar(16) PRIMARY KEY,
	"student_contract_id" varchar(16),
	"teacher_contract_id" varchar(16),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "contract_tokens" (
	"id" varchar(16) PRIMARY KEY,
	"token" varchar(100) NOT NULL,
	"student_contract_id" varchar(16),
	"teacher_contract_id" varchar(16),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(150) NOT NULL,
	"nationality" varchar(100) NOT NULL,
	"country_alpha2_code" varchar(4),
	"postal_code_mask" varchar(12),
	"phone_country_code" varchar(4),
	"phone_mask" varchar(20),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"code" varchar(4) NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"country_alpha2_code" varchar(4) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "data_contracts" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "disciplines" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_responsibles" (
	"id" varchar(16) PRIMARY KEY,
	"is_active" boolean DEFAULT true NOT NULL,
	"address_id" varchar(16) NOT NULL,
	"name" varchar(300) NOT NULL,
	"email" varchar(200) NOT NULL,
	"school_registry" char(14) NOT NULL,
	"profile_picture" varchar(350),
	"birthday" timestamp NOT NULL,
	"verification_token" char(10),
	"verified_at" timestamp,
	"primary_phone_country_code" char(4) NOT NULL,
	"primary_phone_number" char(20) NOT NULL,
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"vat_number" char(40) NOT NULL,
	"document_type" integer NOT NULL,
	"gender" "gender" NOT NULL,
	"password" varchar(200) NOT NULL,
	"password_reset_token" char(10),
	"password_reset_token_expiration" timestamp,
	"mobile_device_token" varchar(300),
	"first_access" boolean NOT NULL,
	"send_notifications_block" boolean NOT NULL,
	"nationality_id" varchar(16) NOT NULL,
	"customer_ext_id" varchar(200),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "internal_campaigns" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(200) NOT NULL,
	"url" text,
	"campaign_content" varchar(255),
	"campaign_id" varchar(255),
	"campaign_medium" varchar(255),
	"campaign_name" varchar(255),
	"campaign_term" varchar(255),
	"campaign_source" "campaign_source",
	"is_active" boolean DEFAULT true NOT NULL,
	"seller_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoice_itens" (
	"id" varchar(16) PRIMARY KEY,
	"invoice_id" varchar(16) NOT NULL,
	"student_contract_id" varchar(16),
	"description" varchar(200) NOT NULL,
	"is_credit" boolean NOT NULL,
	"value" numeric(18,2) NOT NULL,
	"invoice_item_type" "invoice_item_type" NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoice_notes" (
	"id" varchar(16) PRIMARY KEY,
	"invoice_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"due_date" timestamp(6) with time zone NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"invoice_status" "invoice_status" NOT NULL,
	"payment_type" "payment_type" DEFAULT 'payment_link'::"payment_type" NOT NULL,
	"paid_at" timestamp(6) with time zone,
	"collector_id" varchar(16),
	"boleto_status" integer,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_activities" (
	"id" varchar(16) PRIMARY KEY,
	"description" varchar(500) NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"issue_id" varchar(16) NOT NULL,
	"issue_activity_type" "issue_activity_type" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_attachments" (
	"id" varchar(16) PRIMARY KEY,
	"issue_id" varchar(16) NOT NULL,
	"name" varchar(500) NOT NULL,
	"url" varchar(500) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issue_comments" (
	"id" varchar(16) PRIMARY KEY,
	"issue_id" varchar(16) NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"version_implemented" varchar(50),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_import_files" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_imports" (
	"id" varchar(16) PRIMARY KEY,
	"lead_import_file_id" varchar(16) NOT NULL,
	"lead_id" varchar(16),
	"status" "lead_import_status" NOT NULL,
	"error" text,
	"line_number" integer,
	"line_text" text,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_notes" (
	"id" varchar(16) PRIMARY KEY,
	"lead_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"user_profile_picture" varchar(250) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_tags" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"color" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "lead_with_tags" (
	"id" varchar(16) PRIMARY KEY,
	"lead_id" varchar(16) NOT NULL,
	"lead_tag_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" varchar(16) PRIMARY KEY,
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
	"age" integer,
	"click_id" varchar(255),
	"event_source_url" text,
	"fbc" varchar(255),
	"fbp" varchar(255),
	"fb_leads_form" varchar(255),
	"lead_source" integer,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "material_with_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY,
	"material_id" varchar(16) NOT NULL,
	"student_class_experimental_feedback_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "national_holidays" (
	"id" varchar(16) PRIMARY KEY,
	"type" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"date" timestamp(6) with time zone NOT NULL,
	"is_movable" boolean NOT NULL,
	"country_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "notification_templates" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" varchar(16) PRIMARY KEY,
	"invoice_id" varchar(16) NOT NULL,
	"description" varchar(500) NOT NULL,
	"doc_sent_link" varchar(300),
	"amount" numeric(18,2) NOT NULL,
	"tid" varchar(200),
	"nsu" varchar(200),
	"url" text,
	"pix_copy_and_paste" text,
	"is_on_sale" boolean NOT NULL,
	"type" "payment_type" NOT NULL,
	"status" "payment_status" DEFAULT 'pending'::"payment_status" NOT NULL,
	"origin_paid" varchar(36),
	"due_at" timestamp(6) with time zone,
	"paid_at" timestamp(6) with time zone,
	"is_manual" boolean NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" varchar(16) PRIMARY KEY,
	"user_id" varchar(16) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"user_type" integer NOT NULL,
	"token_hash" char(64) NOT NULL,
	"created_at" timestamp(6) with time zone NOT NULL,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"revoked_at" timestamp(6) with time zone,
	"replaced_by_token_hash" char(64),
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" varchar(16) PRIMARY KEY,
	"user_admin_id" varchar(16) NOT NULL,
	"type" "report_type" NOT NULL,
	"file_link" text,
	"start_date" timestamp(6) with time zone,
	"end_date" timestamp(6) with time zone,
	"status" "report_status" NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "sellers" (
	"id" varchar(16) PRIMARY KEY,
	"tenant_id" varchar(16) NOT NULL,
	"referral_code" varchar(10) NOT NULL,
	"lead_prefix" varchar(2) NOT NULL,
	"daily_to_sell" numeric(18,2),
	"daily_experimental_class" integer,
	"pixel_id" text,
	"pixel_secret" text,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "squad_managers" (
	"id" varchar(16) PRIMARY KEY,
	"user_admin_id" varchar(16) NOT NULL,
	"squad_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "squads" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"primary_phone_country_code" varchar(4),
	"primary_phone_number" varchar(20),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_cancel_pause_job" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"effective_date" timestamp(6) with time zone NOT NULL,
	"return_date" timestamp(6) with time zone,
	"status" "pause_cancel_status" NOT NULL,
	"type" "pause_cancel_type" NOT NULL,
	"cancel_reason" integer,
	"stop_reason" "stop_reason",
	"keep_teacher" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_events" (
	"id" varchar(16) PRIMARY KEY,
	"external_student_class_id" varchar(36) NOT NULL,
	"user_type" integer NOT NULL,
	"event" integer NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY,
	"student_class_id" varchar(16),
	"lead_id" varchar(16),
	"level" "level" NOT NULL,
	"rating" integer,
	"description" varchar(500) NOT NULL,
	"requeriment_level" "requeriment_level",
	"reason" "study_reason" NOT NULL,
	"student_specific_condition_id" varchar(16),
	"student_profession_id" varchar(16),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_meet_events" (
	"id" varchar(16) PRIMARY KEY,
	"student_class_id" varchar(16) NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"user_type" integer NOT NULL,
	"event_date" timestamp(6) with time zone NOT NULL,
	"type" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_student_feedbacks" (
	"id" varchar(16) PRIMARY KEY,
	"student_class_id" varchar(16) NOT NULL,
	"teacher_rating" integer NOT NULL,
	"description" text,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_class_teacher_feedbacks" (
	"id" varchar(16) PRIMARY KEY,
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
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_classes" (
	"id" varchar(16) PRIMARY KEY,
	"invoice_item_id" varchar(16),
	"lead_id" varchar(16),
	"student_id" varchar(16),
	"discipline_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16),
	"class_date" timestamp(6) with time zone NOT NULL,
	"duration" integer NOT NULL,
	"class_link" varchar(500),
	"status" "class_status" NOT NULL,
	"rescheduled" boolean NOT NULL,
	"two_hours_schedulle" boolean NOT NULL,
	"thirty_min_schedulle" boolean NOT NULL,
	"type" "class_type" DEFAULT 'effective'::"class_type" NOT NULL,
	"observation" text,
	"class_egress_link" varchar(500),
	"conference_id" varchar(30),
	"event_id" varchar(30),
	"room_id" varchar(30),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_class_options" (
	"id" varchar(16) PRIMARY KEY,
	"student_contract_id" varchar(16) NOT NULL,
	"day_of_week" integer NOT NULL,
	"desired_time" time NOT NULL,
	"duration" integer,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_models" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contract_packages" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"description" text,
	"max_value" numeric(18,2) NOT NULL,
	"min_value" numeric(18,2) NOT NULL,
	"weekly_class_count" integer NOT NULL,
	"sale_start" timestamp(6) with time zone,
	"sale_end" timestamp(6) with time zone,
	"class_duration" integer NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"rescheduling_limit" integer NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_contracts" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16),
	"lead_id" varchar(16),
	"student_contract_model_id" varchar(16) NOT NULL,
	"data_contract_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"currency_id" varchar(16) NOT NULL,
	"start_date" timestamp(6) with time zone NOT NULL,
	"first_payment_date" timestamp(6) with time zone NOT NULL,
	"duration" integer NOT NULL,
	"free_months" integer NOT NULL,
	"paid_months" integer NOT NULL,
	"end_of_term" timestamp(6) with time zone NOT NULL,
	"status" "contract_status" NOT NULL,
	"sign_status" "contract_sign_status" NOT NULL,
	"sign_date" timestamp(6) with time zone,
	"max_value" numeric(18,2) NOT NULL,
	"value" numeric(18,2) NOT NULL,
	"level" "level" NOT NULL,
	"payment_type" "payment_type" NOT NULL,
	"is_total_payment" boolean NOT NULL,
	"class_duration" integer NOT NULL,
	"weekly_class_count" integer NOT NULL,
	"weight" numeric(18,2) NOT NULL,
	"contract_package_snap_shot" json,
	"teacher_id" varchar(16),
	"rescheduling_limit" integer NOT NULL,
	"seller_id" varchar(16),
	"file_link" text,
	"sign_file_link" text,
	"is_native" boolean NOT NULL,
	"is_responsible" boolean DEFAULT false NOT NULL,
	"user_admin_entity_id" varchar(16),
	"min_value" numeric(18,2),
	"register_value" numeric(18,2),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_history_events" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"type" "student_event_type" NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"description" text,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_internal_notes" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"user_admin_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_professions" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_ranking" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"total_points" integer NOT NULL,
	"rank" integer,
	"last_calculated_at" timestamp NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_request_events" (
	"id" varchar(16) PRIMARY KEY,
	"student_request_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_request_types" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"urgency" integer NOT NULL,
	"is_financial" boolean NOT NULL,
	"is_internal" boolean DEFAULT false NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_requests" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"student_request_type_id" varchar(16) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_specific_conditions" (
	"id" varchar(16) PRIMARY KEY,
	"description" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_observations" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_request_attributes" (
	"id" varchar(16) PRIMARY KEY,
	"student_teacher_request_id" varchar(16) NOT NULL,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_teacher_requests" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"teacher_id" varchar(16),
	"student_contract_id" varchar(16) NOT NULL,
	"status" "student_teacher_request_status" NOT NULL,
	"type" "student_teacher_request_type" NOT NULL,
	"is_manual" boolean NOT NULL,
	"first_invoice_paid" boolean NOT NULL,
	"allocation_quantity" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_terms" (
	"id" varchar(16) PRIMARY KEY,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_transfer_reasons" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_with_materials" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"material_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "student_with_terms" (
	"id" varchar(16) PRIMARY KEY,
	"student_id" varchar(16) NOT NULL,
	"student_term_id" varchar(16) NOT NULL,
	"is_accept" boolean NOT NULL,
	"token" varchar(100) NOT NULL,
	"accept_at" timestamp(6) with time zone,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" varchar(16) PRIMARY KEY,
	"address_id" varchar(16) NOT NULL,
	"status" integer NOT NULL,
	"collector_id" varchar(16),
	"financial_responsible_id" varchar(16),
	"new_classes_in_app" boolean DEFAULT false NOT NULL,
	"company_id" varchar(16),
	"name" varchar(300) NOT NULL,
	"email" varchar(200) NOT NULL,
	"school_registry" char(14) NOT NULL,
	"profile_picture" varchar(300),
	"birthday" timestamp(6) with time zone NOT NULL,
	"verification_token" char(10),
	"verified_at" timestamp,
	"primary_phone_country_code" char(4) NOT NULL,
	"primary_phone_number" char(20) NOT NULL,
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"v_a_t_number" char(40) NOT NULL,
	"document_type" integer NOT NULL,
	"gender" "gender" NOT NULL,
	"password" varchar(200) NOT NULL,
	"password_reset_token" char(10),
	"password_reset_token_expiration" timestamp,
	"mobile_device_token" varchar(300),
	"first_access" boolean NOT NULL,
	"send_notifications_block" boolean DEFAULT false NOT NULL,
	"nationality_id" varchar(16) NOT NULL,
	"customer_ext_id" varchar(200),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_attribute_with_experimental_feedbacks" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"student_class_experimental_feedback_id" varchar(16) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_attributes" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"can_select" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_availabilities" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_contract_models" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_contracts" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"discipline_id" varchar(16) NOT NULL,
	"teacher_contract_model_id" varchar(16),
	"student_value" numeric(18,2) NOT NULL,
	"student_native_value" numeric(18,2) NOT NULL,
	"level" "level" NOT NULL,
	"sign_status" integer NOT NULL,
	"teacher_type" "teacher_type" NOT NULL,
	"data_contract_id" varchar(16),
	"sign_date" timestamp(6) with time zone,
	"end_at" timestamp(6) with time zone,
	"sign_document_link" text,
	"is_native" boolean NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_history_events" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"type" "teacher_event_type" NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(200) NOT NULL,
	"description" text,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_internal_notes" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_request_events" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_request_id" varchar(16) NOT NULL,
	"message" text NOT NULL,
	"school_registry" char(14) NOT NULL,
	"user_name" varchar(150) NOT NULL,
	"user_profile_picture" varchar(200) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_request_types" (
	"id" varchar(16) PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"urgency" "urgency" NOT NULL,
	"is_financial" boolean NOT NULL,
	"is_internal" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_requests" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_request_type_id" varchar(16) NOT NULL,
	"status" "teacher_request_status" NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_terms" (
	"id" varchar(16) PRIMARY KEY,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_transfer_histories" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"student_id" varchar(16) NOT NULL,
	"student_transfer_reason_id" varchar(16) NOT NULL,
	"description" varchar(500),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_with_attributes" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_attribute_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teacher_with_terms" (
	"id" varchar(16) PRIMARY KEY,
	"teacher_id" varchar(16) NOT NULL,
	"teacher_term_id" varchar(16) NOT NULL,
	"is_accept" boolean NOT NULL,
	"token" varchar(100) NOT NULL,
	"accept_at" timestamp(6) with time zone,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" varchar(16) PRIMARY KEY,
	"squad_id" varchar(16) NOT NULL,
	"address_id" varchar(16) NOT NULL,
	"class_link" varchar(300),
	"is_old_instructor" boolean NOT NULL,
	"status" "teacher_status" NOT NULL,
	"bank_account_id" varchar(16),
	"name" varchar(300) NOT NULL,
	"email" varchar(200) NOT NULL,
	"school_registry" char(14) NOT NULL,
	"profile_picture" varchar(300),
	"birthday" timestamp(6) with time zone NOT NULL,
	"verification_token" char(10),
	"verified_at" timestamp,
	"primary_phone_country_code" char(4) NOT NULL,
	"primary_phone_number" char(20) NOT NULL,
	"secondary_phone_country_code" char(4),
	"secondary_phone_number" char(20),
	"vat_number" char(40) NOT NULL,
	"document_type" "document_type" NOT NULL,
	"gender" "gender" NOT NULL,
	"password" varchar(200) NOT NULL,
	"password_reset_token" char(10),
	"password_reset_token_expiration" timestamp,
	"mobile_device_token" varchar(300),
	"first_access" boolean NOT NULL,
	"send_notifications_block" boolean DEFAULT false NOT NULL,
	"nationality_id" varchar(16) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "permission_groups_tenant_id_name_key" ON "permission_groups" ("tenant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_profiles_document_number_type_key" ON "tenant_profiles" ("document_number","document_type");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_roles_role_tenant_id_key" ON "tenant_roles" ("role","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "terms_of_use_version_language_key" ON "terms_of_use" ("version","language");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_token_key" ON "user_password_reset" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "user_profiles_document_number_type_key" ON "user_profiles" ("document_number","document_type");--> statement-breakpoint
CREATE UNIQUE INDEX "utpg_user_tenant_permission_group_uk" ON "user_tenant_permission_groups" ("user_tenant_id","permission_group_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_tenants_invitation_token_key" ON "user_tenants" ("invitation_token");--> statement-breakpoint
CREATE UNIQUE INDEX "user_tenants_user_id_tenant_id_key" ON "user_tenants" ("user_id","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");--> statement-breakpoint
CREATE INDEX "articles__title_idx" ON "articles" ("title");--> statement-breakpoint
CREATE INDEX "banks__country_id_idx" ON "banks" ("country_id");--> statement-breakpoint
CREATE INDEX "books__order_index_idx" ON "books" ("order_index");--> statement-breakpoint
CREATE INDEX "contract_sign_job_controls__student_contract_id_idx" ON "contract_sign_job_controls" ("student_contract_id");--> statement-breakpoint
CREATE INDEX "contract_sign_job_controls__teacher_contract_id_idx" ON "contract_sign_job_controls" ("teacher_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contract_tokens__student_contract_id_key" ON "contract_tokens" ("student_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contract_tokens__teacher_contract_id_key" ON "contract_tokens" ("teacher_contract_id");--> statement-breakpoint
CREATE UNIQUE INDEX "countries__name_key" ON "countries" ("name");--> statement-breakpoint
CREATE INDEX "currencies_deleted_at_idx" ON "currencies" ("deleted_at");--> statement-breakpoint
CREATE INDEX "data_contracts__address_id_idx" ON "data_contracts" ("address_id");--> statement-breakpoint
CREATE INDEX "data_contracts__financial_responsible_id_idx" ON "data_contracts" ("financial_responsible_id");--> statement-breakpoint
CREATE INDEX "data_contracts__nationality_id_idx" ON "data_contracts" ("nationality_id");--> statement-breakpoint
CREATE UNIQUE INDEX "disciplines__name_key" ON "disciplines" ("name");--> statement-breakpoint
CREATE INDEX "financial_responsibles__address_id_idx" ON "financial_responsibles" ("address_id");--> statement-breakpoint
CREATE INDEX "financial_responsibles__nationality_id_idx" ON "financial_responsibles" ("nationality_id");--> statement-breakpoint
CREATE INDEX "internal_campaigns__seller_id_idx" ON "internal_campaigns" ("seller_id");--> statement-breakpoint
CREATE INDEX "idx_invoiceitem_invoiceid_removedat" ON "invoice_itens" ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "idx_invoiceitens_invoice_removed" ON "invoice_itens" ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "invoice_itens__invoice_id_idx" ON "invoice_itens" ("invoice_id");--> statement-breakpoint
CREATE INDEX "invoice_itens__student_contract_id_idx" ON "invoice_itens" ("student_contract_id");--> statement-breakpoint
CREATE INDEX "idx_invoicenotes_invoiceid_removedat" ON "invoice_notes" ("invoice_id","deleted_at");--> statement-breakpoint
CREATE INDEX "invoice_notes__invoice_id_idx" ON "invoice_notes" ("invoice_id");--> statement-breakpoint
CREATE INDEX "idx_invoices_grid" ON "invoices" ("deleted_at","due_date");--> statement-breakpoint
CREATE INDEX "invoices__collector_id_idx" ON "invoices" ("collector_id");--> statement-breakpoint
CREATE INDEX "invoices__currency_id_idx" ON "invoices" ("currency_id");--> statement-breakpoint
CREATE INDEX "invoices__student_id_idx" ON "invoices" ("student_id");--> statement-breakpoint
CREATE INDEX "issue_activities__issue_id_idx" ON "issue_activities" ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_activities__user_id_idx" ON "issue_activities" ("user_id");--> statement-breakpoint
CREATE INDEX "issue_attachments__issue_id_idx" ON "issue_attachments" ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_comments__issue_id_idx" ON "issue_comments" ("issue_id");--> statement-breakpoint
CREATE INDEX "issue_comments__user_id_idx" ON "issue_comments" ("user_id");--> statement-breakpoint
CREATE INDEX "issues__assignee_id_idx" ON "issues" ("assignee_id");--> statement-breakpoint
CREATE INDEX "issues__created_by_id_idx" ON "issues" ("created_by_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__company_id_idx" ON "lead_import_files" ("company_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__internal_campaign_id_idx" ON "lead_import_files" ("internal_campaign_id");--> statement-breakpoint
CREATE INDEX "lead_import_files__user_admin_id_idx" ON "lead_import_files" ("user_admin_id");--> statement-breakpoint
CREATE INDEX "lead_imports__lead_id_idx" ON "lead_imports" ("lead_id");--> statement-breakpoint
CREATE INDEX "lead_imports__lead_import_file_id_idx" ON "lead_imports" ("lead_import_file_id");--> statement-breakpoint
CREATE INDEX "lead_notes__lead_id_idx" ON "lead_notes" ("lead_id");--> statement-breakpoint
CREATE INDEX "lead_tags_deleted_at_idx" ON "lead_tags" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "lead_with_tags__lead_id__lead_tag_id_key" ON "lead_with_tags" ("lead_id","lead_tag_id");--> statement-breakpoint
CREATE INDEX "lead_with_tags__lead_tag_id_idx" ON "lead_with_tags" ("lead_tag_id");--> statement-breakpoint
CREATE INDEX "lead_with_tags_deleted_at_idx" ON "lead_with_tags" ("deleted_at");--> statement-breakpoint
CREATE INDEX "leads__company_id_idx" ON "leads" ("company_id");--> statement-breakpoint
CREATE INDEX "leads__discipline_id_idx" ON "leads" ("discipline_id");--> statement-breakpoint
CREATE INDEX "leads__internal_campaign_id_idx" ON "leads" ("internal_campaign_id");--> statement-breakpoint
CREATE INDEX "leads_deleted_at_idx" ON "leads" ("deleted_at");--> statement-breakpoint
CREATE INDEX "leads__seller_id_idx" ON "leads" ("seller_id");--> statement-breakpoint
CREATE INDEX "leads__full_idx" ON "leads" ("name","email","primary_phone_number","primary_phone_country_code");--> statement-breakpoint
CREATE UNIQUE INDEX "mwef_material_scef_uk" ON "material_with_experimental_feedbacks" ("material_id","student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "mwef_deleted_at_idx" ON "material_with_experimental_feedbacks" ("deleted_at");--> statement-breakpoint
CREATE INDEX "mwef_scef_id_idx" ON "material_with_experimental_feedbacks" ("student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "materials_deleted_at_idx" ON "materials" ("deleted_at");--> statement-breakpoint
CREATE INDEX "materials__teacher_id_idx" ON "materials" ("teacher_id");--> statement-breakpoint
CREATE INDEX "national_holidays__country_id_idx" ON "national_holidays" ("country_id");--> statement-breakpoint
CREATE INDEX "national_holidays__type_idx" ON "national_holidays" ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "national_holidays__country_id_date_name_key" ON "national_holidays" ("country_id","date","name");--> statement-breakpoint
CREATE UNIQUE INDEX "notification_templates__name_key" ON "notification_templates" ("name");--> statement-breakpoint
CREATE INDEX "notification_templates_deleted_at_idx" ON "notification_templates" ("deleted_at");--> statement-breakpoint
CREATE INDEX "idx_payments_invoice_status" ON "payments" ("invoice_id","status","deleted_at");--> statement-breakpoint
CREATE INDEX "idx_payments_invoice_status_removed" ON "payments" ("invoice_id","status","deleted_at");--> statement-breakpoint
CREATE INDEX "payments__invoice_id_idx" ON "payments" ("invoice_id");--> statement-breakpoint
CREATE INDEX "payments_deleted_at_idx" ON "payments" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_tokens__token_hash_key" ON "refresh_tokens" ("token_hash");--> statement-breakpoint
CREATE INDEX "refresh_tokens__user_type__user_id__revoked_at__expires_at_idx" ON "refresh_tokens" ("user_type","user_id","revoked_at","expires_at");--> statement-breakpoint
CREATE INDEX "refresh_tokens__user_type__user_name_idx" ON "refresh_tokens" ("user_type","user_name");--> statement-breakpoint
CREATE INDEX "reports_deleted_at_idx" ON "reports" ("deleted_at");--> statement-breakpoint
CREATE INDEX "squad_managers_deleted_at_idx" ON "squad_managers" ("deleted_at");--> statement-breakpoint
CREATE INDEX "squad_managers__squad_id_idx" ON "squad_managers" ("squad_id");--> statement-breakpoint
CREATE UNIQUE INDEX "squads__name_key" ON "squads" ("name");--> statement-breakpoint
CREATE INDEX "squads_deleted_at_idx" ON "squads" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_cancel_pause_job_deleted_at_idx" ON "student_cancel_pause_job" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_cancel_pause_job__student_id_idx" ON "student_cancel_pause_job" ("student_id");--> statement-breakpoint
CREATE INDEX "student_class_events_deleted_at_idx" ON "student_class_events" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "scef_lead_id_key" ON "student_class_experimental_feedbacks" ("lead_id");--> statement-breakpoint
CREATE INDEX "scef_deleted_at_idx" ON "student_class_experimental_feedbacks" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "scef_student_class_id_key" ON "student_class_experimental_feedbacks" ("student_class_id");--> statement-breakpoint
CREATE INDEX "scef_student_profession_id_idx" ON "student_class_experimental_feedbacks" ("student_profession_id");--> statement-breakpoint
CREATE INDEX "scef_ssc_id_idx" ON "student_class_experimental_feedbacks" ("student_specific_condition_id");--> statement-breakpoint
CREATE INDEX "student_class_meet_events_deleted_at_idx" ON "student_class_meet_events" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_class_meet_events__student_class_id_idx" ON "student_class_meet_events" ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_student_feedbacks_deleted_at_idx" ON "student_class_student_feedbacks" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "student_class_student_feedbacks__student_class_id_key" ON "student_class_student_feedbacks" ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_teacher_feedbacks_deleted_at_idx" ON "student_class_teacher_feedbacks" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "student_class_teacher_feedbacks__student_class_id_key" ON "student_class_teacher_feedbacks" ("student_class_id");--> statement-breakpoint
CREATE INDEX "student_class_teacher_feedbacks__teacher_entity_id_idx" ON "student_class_teacher_feedbacks" ("teacher_entity_id");--> statement-breakpoint
CREATE INDEX "idx_studentclass_id_classlink_removed" ON "student_classes" ("id","class_link","deleted_at");--> statement-breakpoint
CREATE INDEX "allocate_students_idx" ON "student_classes" ("teacher_id","class_date","status","rescheduled","deleted_at");--> statement-breakpoint
CREATE INDEX "classes__student__status__date__time_idx" ON "student_classes" ("student_id","status","class_date");--> statement-breakpoint
CREATE INDEX "student_classes__discipline_id_idx" ON "student_classes" ("discipline_id");--> statement-breakpoint
CREATE INDEX "student_classes__invoice_item_id_idx" ON "student_classes" ("invoice_item_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_classes__lead_id_key" ON "student_classes" ("lead_id");--> statement-breakpoint
CREATE INDEX "student_classes_deleted_at_idx" ON "student_classes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_classes__student_id_idx" ON "student_classes" ("student_id");--> statement-breakpoint
CREATE INDEX "student_classes__teacher_id_idx" ON "student_classes" ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_classes__teacher_id__status_idx" ON "student_classes" ("teacher_id","status");--> statement-breakpoint
CREATE INDEX "sclass_teacher_status_date_start_idx" ON "student_classes" ("teacher_id","status","class_date");--> statement-breakpoint
CREATE INDEX "student_contract_class_options_deleted_at_idx" ON "student_contract_class_options" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contract_class_options__student_contract_id_idx" ON "student_contract_class_options" ("student_contract_id");--> statement-breakpoint
CREATE INDEX "student_contract_models_deleted_at_idx" ON "student_contract_models" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contract_packages__currency_id_idx" ON "student_contract_packages" ("currency_id");--> statement-breakpoint
CREATE INDEX "student_contract_packages__discipline_id_idx" ON "student_contract_packages" ("discipline_id");--> statement-breakpoint
CREATE INDEX "student_contract_packages_deleted_at_idx" ON "student_contract_packages" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contracts__currency_id_idx" ON "student_contracts" ("currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_contracts__data_contract_id_key" ON "student_contracts" ("data_contract_id");--> statement-breakpoint
CREATE INDEX "student_contracts__discipline_id_idx" ON "student_contracts" ("discipline_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_contracts__lead_id_key" ON "student_contracts" ("lead_id");--> statement-breakpoint
CREATE INDEX "student_contracts_deleted_at_idx" ON "student_contracts" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_contracts__seller_id_idx" ON "student_contracts" ("seller_id");--> statement-breakpoint
CREATE INDEX "student_contracts__student_contract_model_id_idx" ON "student_contracts" ("student_contract_model_id");--> statement-breakpoint
CREATE INDEX "student_contracts__student_id_idx" ON "student_contracts" ("student_id");--> statement-breakpoint
CREATE INDEX "student_contracts__teacher_id_idx" ON "student_contracts" ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_history_events_deleted_at_idx" ON "student_history_events" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_history_events__student_id_idx" ON "student_history_events" ("student_id");--> statement-breakpoint
CREATE INDEX "student_internal_notes_deleted_at_idx" ON "student_internal_notes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_internal_notes__student_id_idx" ON "student_internal_notes" ("student_id");--> statement-breakpoint
CREATE INDEX "student_professions_deleted_at_idx" ON "student_professions" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_ranking__rank_idx" ON "student_ranking" ("rank");--> statement-breakpoint
CREATE INDEX "student_ranking_deleted_at_idx" ON "student_ranking" ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "student_ranking__student_id_key" ON "student_ranking" ("student_id");--> statement-breakpoint
CREATE INDEX "student_ranking__total_points_idx" ON "student_ranking" ("total_points");--> statement-breakpoint
CREATE INDEX "student_request_events_deleted_at_idx" ON "student_request_events" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_request_events__student_request_id_idx" ON "student_request_events" ("student_request_id");--> statement-breakpoint
CREATE INDEX "student_request_types_deleted_at_idx" ON "student_request_types" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_requests_deleted_at_idx" ON "student_requests" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_requests__student_id_idx" ON "student_requests" ("student_id");--> statement-breakpoint
CREATE INDEX "student_requests__student_request_type_id_idx" ON "student_requests" ("student_request_type_id");--> statement-breakpoint
CREATE INDEX "student_specific_conditions_deleted_at_idx" ON "student_specific_conditions" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_observations_deleted_at_idx" ON "student_teacher_observations" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_observations__student_id_idx" ON "student_teacher_observations" ("student_id");--> statement-breakpoint
CREATE INDEX "student_teacher_observations__teacher_id_idx" ON "student_teacher_observations" ("teacher_id");--> statement-breakpoint
CREATE INDEX "stra_deleted_at_idx" ON "student_teacher_request_attributes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "stra_str_id_idx" ON "student_teacher_request_attributes" ("student_teacher_request_id");--> statement-breakpoint
CREATE INDEX "stra_ta_id_idx" ON "student_teacher_request_attributes" ("teacher_attribute_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests_deleted_at_idx" ON "student_teacher_requests" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__student_contract_id_idx" ON "student_teacher_requests" ("student_contract_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__student_id_idx" ON "student_teacher_requests" ("student_id");--> statement-breakpoint
CREATE INDEX "student_teacher_requests__teacher_id_idx" ON "student_teacher_requests" ("teacher_id");--> statement-breakpoint
CREATE INDEX "student_terms_deleted_at_idx" ON "student_terms" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_transfer_reasons_deleted_at_idx" ON "student_transfer_reasons" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_materials__material_id_idx" ON "student_with_materials" ("material_id");--> statement-breakpoint
CREATE INDEX "student_with_materials_deleted_at_idx" ON "student_with_materials" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_materials__student_id_idx" ON "student_with_materials" ("student_id");--> statement-breakpoint
CREATE INDEX "student_with_terms_deleted_at_idx" ON "student_with_terms" ("deleted_at");--> statement-breakpoint
CREATE INDEX "student_with_terms__student_id_idx" ON "student_with_terms" ("student_id");--> statement-breakpoint
CREATE INDEX "student_with_terms__student_term_id_idx" ON "student_with_terms" ("student_term_id");--> statement-breakpoint
CREATE INDEX "students__address_id_idx" ON "students" ("address_id");--> statement-breakpoint
CREATE INDEX "students__collector_id_idx" ON "students" ("collector_id");--> statement-breakpoint
CREATE INDEX "students__company_id_idx" ON "students" ("company_id");--> statement-breakpoint
CREATE INDEX "students__financial_responsible_id_idx" ON "students" ("financial_responsible_id");--> statement-breakpoint
CREATE INDEX "students__nationality_id_idx" ON "students" ("nationality_id");--> statement-breakpoint
CREATE INDEX "students_deleted_at_idx" ON "students" ("deleted_at");--> statement-breakpoint
CREATE INDEX "tawef_deleted_at_idx" ON "teacher_attribute_with_experimental_feedbacks" ("deleted_at");--> statement-breakpoint
CREATE INDEX "tawef_scef_id_idx" ON "teacher_attribute_with_experimental_feedbacks" ("student_class_experimental_feedback_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tawef_ta_scef_uk" ON "teacher_attribute_with_experimental_feedbacks" ("teacher_attribute_id","student_class_experimental_feedback_id");--> statement-breakpoint
CREATE INDEX "teacher_attributes_deleted_at_idx" ON "teacher_attributes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_availabilities_deleted_at_idx" ON "teacher_availabilities" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_availabilities__teacher_id_idx" ON "teacher_availabilities" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_contract_models_deleted_at_idx" ON "teacher_contract_models" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_contracts__data_contract_id_idx" ON "teacher_contracts" ("data_contract_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts__discipline_id_idx" ON "teacher_contracts" ("discipline_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts_deleted_at_idx" ON "teacher_contracts" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_contracts__teacher_contract_model_id_idx" ON "teacher_contracts" ("teacher_contract_model_id");--> statement-breakpoint
CREATE INDEX "teacher_contracts__teacher_id_idx" ON "teacher_contracts" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_history_events_deleted_at_idx" ON "teacher_history_events" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_history_events__teacher_id_idx" ON "teacher_history_events" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_internal_notes_deleted_at_idx" ON "teacher_internal_notes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_internal_notes__teacher_id_idx" ON "teacher_internal_notes" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_request_events_deleted_at_idx" ON "teacher_request_events" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_request_events__teacher_request_id_idx" ON "teacher_request_events" ("teacher_request_id");--> statement-breakpoint
CREATE INDEX "teacher_request_types_deleted_at_idx" ON "teacher_request_types" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_requests_deleted_at_idx" ON "teacher_requests" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_requests__teacher_id_idx" ON "teacher_requests" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_requests__teacher_request_type_id_idx" ON "teacher_requests" ("teacher_request_type_id");--> statement-breakpoint
CREATE INDEX "teacher_terms_deleted_at_idx" ON "teacher_terms" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories_deleted_at_idx" ON "teacher_transfer_histories" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__student_id_idx" ON "teacher_transfer_histories" ("student_id");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__student_transfer_reason_id_idx" ON "teacher_transfer_histories" ("student_transfer_reason_id");--> statement-breakpoint
CREATE INDEX "teacher_transfer_histories__teacher_id_idx" ON "teacher_transfer_histories" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes_deleted_at_idx" ON "teacher_with_attributes" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes__teacher_attribute_id_idx" ON "teacher_with_attributes" ("teacher_attribute_id");--> statement-breakpoint
CREATE INDEX "teacher_with_attributes__teacher_id_idx" ON "teacher_with_attributes" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_terms_deleted_at_idx" ON "teacher_with_terms" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teacher_with_terms__teacher_id_idx" ON "teacher_with_terms" ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_with_terms__teacher_term_id_idx" ON "teacher_with_terms" ("teacher_term_id");--> statement-breakpoint
CREATE INDEX "teachers__address_id_idx" ON "teachers" ("address_id");--> statement-breakpoint
CREATE INDEX "teachers__bank_account_id_idx" ON "teachers" ("bank_account_id");--> statement-breakpoint
CREATE INDEX "teachers__nationality_id_idx" ON "teachers" ("nationality_id");--> statement-breakpoint
CREATE INDEX "teachers_deleted_at_idx" ON "teachers" ("deleted_at");--> statement-breakpoint
CREATE INDEX "teachers__squad_id_idx" ON "teachers" ("squad_id");--> statement-breakpoint
ALTER TABLE "permission_groups" ADD CONSTRAINT "permission_groups_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "permission_groups_permissions" ADD CONSTRAINT "permission_groups_permissions_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "permission_groups"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tenant_profiles" ADD CONSTRAINT "tenant_profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "medias"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "tenant_profiles" ADD CONSTRAINT "tenant_profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "tenant_roles" ADD CONSTRAINT "tenant_roles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_tenant_profile_id_fkey" FOREIGN KEY ("tenant_profile_id") REFERENCES "tenant_profiles"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" ADD CONSTRAINT "terms_of_use_acceptances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "terms_of_use_acceptances" ADD CONSTRAINT "terms_of_use_acceptances_terms_of_use_id_fkey" FOREIGN KEY ("terms_of_use_id") REFERENCES "terms_of_use"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_password_reset" ADD CONSTRAINT "password_reset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "medias"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_current_tenant_id_fkey" FOREIGN KEY ("current_tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_tenant_permission_groups" ADD CONSTRAINT "user_tenant_permission_groups_user_tenant_id_fkey" FOREIGN KEY ("user_tenant_id") REFERENCES "user_tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_tenant_permission_groups" ADD CONSTRAINT "user_tenant_permission_groups_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "permission_groups"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "contract_sign_job_controls" ADD CONSTRAINT "contract_sign_job_controls__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "student_contracts"("id");--> statement-breakpoint
ALTER TABLE "contract_sign_job_controls" ADD CONSTRAINT "contract_sign_job_controls__teacher_contract_id_fkey" FOREIGN KEY ("teacher_contract_id") REFERENCES "teacher_contracts"("id");--> statement-breakpoint
ALTER TABLE "contract_tokens" ADD CONSTRAINT "contract_tokens__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "student_contracts"("id");--> statement-breakpoint
ALTER TABLE "contract_tokens" ADD CONSTRAINT "contract_tokens__teacher_contract_id_fkey" FOREIGN KEY ("teacher_contract_id") REFERENCES "teacher_contracts"("id");--> statement-breakpoint
ALTER TABLE "data_contracts" ADD CONSTRAINT "data_contracts__address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "data_contracts" ADD CONSTRAINT "data_contracts__nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "financial_responsibles" ADD CONSTRAINT "financial_responsibles__address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "financial_responsibles" ADD CONSTRAINT "financial_responsibles__nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "invoice_itens" ADD CONSTRAINT "invoice_itens__invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id");--> statement-breakpoint
ALTER TABLE "invoice_itens" ADD CONSTRAINT "invoice_itens__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "student_contracts"("id");--> statement-breakpoint
ALTER TABLE "invoice_notes" ADD CONSTRAINT "invoice_notes_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "collectors"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "issue_activities" ADD CONSTRAINT "issue_activities_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues"("id");--> statement-breakpoint
ALTER TABLE "issue_attachments" ADD CONSTRAINT "issue_attachments_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues"("id");--> statement-breakpoint
ALTER TABLE "issue_comments" ADD CONSTRAINT "issue_comments_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues"("id");--> statement-breakpoint
ALTER TABLE "lead_import_files" ADD CONSTRAINT "lead_import_files__internal_campaign_id_fkey" FOREIGN KEY ("internal_campaign_id") REFERENCES "internal_campaigns"("id");--> statement-breakpoint
ALTER TABLE "lead_imports" ADD CONSTRAINT "lead_imports__lead_import_file_id_fkey" FOREIGN KEY ("lead_import_file_id") REFERENCES "lead_import_files"("id");--> statement-breakpoint
ALTER TABLE "lead_imports" ADD CONSTRAINT "lead_imports__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "lead_with_tags" ADD CONSTRAINT "lead_with_tags__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "lead_with_tags" ADD CONSTRAINT "lead_with_tags__lead_tag_id_fkey" FOREIGN KEY ("lead_tag_id") REFERENCES "lead_tags"("id");--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__internal_campaign_id_fkey" FOREIGN KEY ("internal_campaign_id") REFERENCES "internal_campaigns"("id");--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads__seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id");--> statement-breakpoint
ALTER TABLE "material_with_experimental_feedbacks" ADD CONSTRAINT "mwef_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id");--> statement-breakpoint
ALTER TABLE "material_with_experimental_feedbacks" ADD CONSTRAINT "mwef_scef_id_fkey" FOREIGN KEY ("student_class_experimental_feedback_id") REFERENCES "student_class_experimental_feedbacks"("id");--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "national_holidays" ADD CONSTRAINT "national_holidays_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id");--> statement-breakpoint
ALTER TABLE "squad_managers" ADD CONSTRAINT "squad_managers_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id");--> statement-breakpoint
ALTER TABLE "student_cancel_pause_job" ADD CONSTRAINT "student_cancel_pause_job_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "student_classes"("id");--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_student_profession_id_fkey" FOREIGN KEY ("student_profession_id") REFERENCES "student_professions"("id");--> statement-breakpoint
ALTER TABLE "student_class_experimental_feedbacks" ADD CONSTRAINT "scef_ssc_id_fkey" FOREIGN KEY ("student_specific_condition_id") REFERENCES "student_specific_conditions"("id");--> statement-breakpoint
ALTER TABLE "student_class_meet_events" ADD CONSTRAINT "student_class_meet_events_fkey" FOREIGN KEY ("student_class_id") REFERENCES "student_classes"("id");--> statement-breakpoint
ALTER TABLE "student_class_student_feedbacks" ADD CONSTRAINT "student_class_student_feedbacks_fkey" FOREIGN KEY ("student_class_id") REFERENCES "student_classes"("id");--> statement-breakpoint
ALTER TABLE "student_class_teacher_feedbacks" ADD CONSTRAINT "student_class_teacher_feedbacks__student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "student_classes"("id");--> statement-breakpoint
ALTER TABLE "student_class_teacher_feedbacks" ADD CONSTRAINT "student_class_teacher_feedbacks__teacher_entity_id_fkey" FOREIGN KEY ("teacher_entity_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__invoice_item_id_fkey" FOREIGN KEY ("invoice_item_id") REFERENCES "invoice_itens"("id");--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "student_contract_class_options" ADD CONSTRAINT "student_contract_class_options_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "student_contracts"("id");--> statement-breakpoint
ALTER TABLE "student_contract_packages" ADD CONSTRAINT "student_contract_packages__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id");--> statement-breakpoint
ALTER TABLE "student_contract_packages" ADD CONSTRAINT "student_contract_packages__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__data_contract_id_fkey" FOREIGN KEY ("data_contract_id") REFERENCES "data_contracts"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__student_contract_model_id_fkey" FOREIGN KEY ("student_contract_model_id") REFERENCES "student_contract_models"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_contracts" ADD CONSTRAINT "student_contracts__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "student_history_events" ADD CONSTRAINT "student_history_events_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_internal_notes" ADD CONSTRAINT "student_internal_notes_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_ranking" ADD CONSTRAINT "student_ranking_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_request_events" ADD CONSTRAINT "student_request_events_fkey" FOREIGN KEY ("student_request_id") REFERENCES "student_requests"("id");--> statement-breakpoint
ALTER TABLE "student_requests" ADD CONSTRAINT "student_requests__student_request_type_id_fkey" FOREIGN KEY ("student_request_type_id") REFERENCES "student_request_types"("id");--> statement-breakpoint
ALTER TABLE "student_requests" ADD CONSTRAINT "student_requests__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_observations" ADD CONSTRAINT "student_teacher_observations__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_observations" ADD CONSTRAINT "student_teacher_observations__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_request_attributes" ADD CONSTRAINT "stra_str_id_fkey" FOREIGN KEY ("student_teacher_request_id") REFERENCES "student_teacher_requests"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_request_attributes" ADD CONSTRAINT "stra_ta_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "teacher_attributes"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__student_contract_id_fkey" FOREIGN KEY ("student_contract_id") REFERENCES "student_contracts"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_teacher_requests" ADD CONSTRAINT "student_teacher_requests__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "student_with_materials" ADD CONSTRAINT "student_with_materials__material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id");--> statement-breakpoint
ALTER TABLE "student_with_materials" ADD CONSTRAINT "student_with_materials__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_with_terms" ADD CONSTRAINT "student_with_terms__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_with_terms" ADD CONSTRAINT "student_with_terms__student_term_id_fkey" FOREIGN KEY ("student_term_id") REFERENCES "student_terms"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__collector_id_fkey" FOREIGN KEY ("collector_id") REFERENCES "collectors"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students__financial_responsible_id_fkey" FOREIGN KEY ("financial_responsible_id") REFERENCES "financial_responsibles"("id");--> statement-breakpoint
ALTER TABLE "teacher_attribute_with_experimental_feedbacks" ADD CONSTRAINT "tawef_scef_id_fkey" FOREIGN KEY ("student_class_experimental_feedback_id") REFERENCES "student_class_experimental_feedbacks"("id");--> statement-breakpoint
ALTER TABLE "teacher_attribute_with_experimental_feedbacks" ADD CONSTRAINT "tawef_ta_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "teacher_attributes"("id");--> statement-breakpoint
ALTER TABLE "teacher_availabilities" ADD CONSTRAINT "teacher_availabilities_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__data_contract_id_fkey" FOREIGN KEY ("data_contract_id") REFERENCES "data_contracts"("id");--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__teacher_contract_model_id_fkey" FOREIGN KEY ("teacher_contract_model_id") REFERENCES "teacher_contract_models"("id");--> statement-breakpoint
ALTER TABLE "teacher_contracts" ADD CONSTRAINT "teacher_contracts__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_history_events" ADD CONSTRAINT "teacher_history_events_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_internal_notes" ADD CONSTRAINT "teacher_internal_notes_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_request_events" ADD CONSTRAINT "teacher_request_events_fkey" FOREIGN KEY ("teacher_request_id") REFERENCES "teacher_requests"("id");--> statement-breakpoint
ALTER TABLE "teacher_requests" ADD CONSTRAINT "teacher_requests__teacher_request_type_id_fkey" FOREIGN KEY ("teacher_request_type_id") REFERENCES "teacher_request_types"("id");--> statement-breakpoint
ALTER TABLE "teacher_requests" ADD CONSTRAINT "teacher_requests__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__student_transfer_reason_id_fkey" FOREIGN KEY ("student_transfer_reason_id") REFERENCES "student_transfer_reasons"("id");--> statement-breakpoint
ALTER TABLE "teacher_transfer_histories" ADD CONSTRAINT "teacher_transfer_histories__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_with_attributes" ADD CONSTRAINT "teacher_with_attributes__teacher_attribute_id_fkey" FOREIGN KEY ("teacher_attribute_id") REFERENCES "teacher_attributes"("id");--> statement-breakpoint
ALTER TABLE "teacher_with_attributes" ADD CONSTRAINT "teacher_with_attributes__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_with_terms" ADD CONSTRAINT "teacher_with_terms__teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_with_terms" ADD CONSTRAINT "teacher_with_terms__teacher_term_id_fkey" FOREIGN KEY ("teacher_term_id") REFERENCES "teacher_terms"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__nationality_id_fkey" FOREIGN KEY ("nationality_id") REFERENCES "countries"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers__squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id");