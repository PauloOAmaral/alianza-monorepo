import { foreignKey, index, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { leadImportFiles } from "./lead-import-files"
import { leads } from "./leads"

export const leadImportStatus = pgEnum("lead_import_status", [
	"pending",
	"processed",
	"failed",
	"partial"
]);

export const leadImports = pgTable(
	"lead_imports",
	{
		id,
		leadImportFileId: varchar("lead_import_file_id", { length: 16 }).notNull(),
		leadId: varchar("lead_id", { length: 16 }),
		status: leadImportStatus("status").notNull(),
		error: text("error"),
		lineNumber: integer("line_number"),
		lineText: text("line_text"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("lead_imports__lead_id_idx").on(table.leadId),
		index("lead_imports__lead_import_file_id_idx").on(table.leadImportFileId),
		foreignKey({
			columns: [table.leadImportFileId],
			foreignColumns: [leadImportFiles.id],
			name: "lead_imports__lead_import_file_id_fkey",
		}),
		foreignKey({
			columns: [table.leadId],
			foreignColumns: [leads.id],
			name: "lead_imports__lead_id_fkey",
		}),
	],
)
