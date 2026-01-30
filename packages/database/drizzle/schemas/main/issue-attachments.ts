import { foreignKey, index, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { issues } from "./issues"

export const issueAttachments = pgTable(
	"issue_attachments",
	{
		id,
		issueId: varchar("issue_id", { length: 16 }).notNull(),
		name: varchar("name", { length: 500 }).notNull(),
		url: varchar("url", { length: 500 }).notNull(),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("issue_attachments__issue_id_idx").on(table.issueId),
		foreignKey({
			columns: [table.issueId],
			foreignColumns: [issues.id],
			name: "issue_attachments_fkey",
		}),
	],
)
