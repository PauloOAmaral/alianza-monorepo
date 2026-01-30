import { foreignKey, index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"
import { issues } from "./issues"

export const issueComments = pgTable(
	"issue_comments",
	{
		id,
		issueId: varchar("issue_id", { length: 16 }).notNull(),
		userId: varchar("user_id", { length: 16 }).notNull(),
		message: text("message").notNull(),
		versionImplemented: varchar("version_implemented", { length: 50 }),
		isActive,
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("issue_comments__issue_id_idx").on(table.issueId),
		index("issue_comments__user_id_idx").on(table.userId),
		foreignKey({
			columns: [table.issueId],
			foreignColumns: [issues.id],
			name: "issue_comments_fkey",
		})
	],
)
