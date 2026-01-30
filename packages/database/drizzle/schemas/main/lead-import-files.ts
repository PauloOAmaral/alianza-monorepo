import { bigint, foreignKey, index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { internalCampaigns } from "./internal-campaigns"

export const leadImportFiles = pgTable(
	"lead_import_files",
	{
		id,
		userAdminId: varchar("user_admin_id", { length: 16 }),
		fileName: varchar("file_name", { length: 250 }).notNull(),
		bucketName: varchar("bucket_name", { length: 100 }).notNull(),
		contentType: varchar("content_type", { length: 100 }).notNull(),
		length: bigint("length", { mode: "number" }).notNull(),
		sucessCount: integer("sucess_count").notNull(),
		errorCount: integer("error_count").notNull(),
		hash: varchar("hash", { length: 255 }),
		errorFilePath: text("error_file_path"),
		internalCampaignId: varchar("internal_campaign_id", { length: 16 }),
		companyId: varchar("company_id", { length: 16 }),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("lead_import_files__company_id_idx").on(table.companyId),
		index("lead_import_files__internal_campaign_id_idx").on(table.internalCampaignId),
		index("lead_import_files__user_admin_id_idx").on(table.userAdminId),
		foreignKey({
			columns: [table.internalCampaignId],
			foreignColumns: [internalCampaigns.id],
			name: "lead_import_files__internal_campaign_id_fkey",
		}),
	],
)
