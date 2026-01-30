import { index, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"

export const issueType = pgEnum("issue_type", [
	"bug", // Bug = 1
	"feature_request", // FeatureRequest = 2
	"improvement", // Improvement = 3
	"questions", // Questions = 4
	"permission", // Permission = 5
]);

export const issueStatus = pgEnum("issue_status", [
	"open", // Aberto = 0
	"in_progress", // Em progresso = 1
	"on_hold", // On Hold = 2
	"resolved", // Resolvido = 3
	"closed", // Fechado = 4
	"awaiting_approval", // Aguardando aprovação = 5
]);

export const issuePriority = pgEnum("issue_priority", [
	"low", // Low = 0
	"medium", // Medium = 1
	"high", // High = 2
	"critical", // Critical = 3
]);

export const issueSection = pgEnum("issue_section", [
	"commerce", // Commerce = 1
	"pedagogic", // Pedagogic = 2
	"financial", // Financial = 3
	"marketing", // Marketing = 4
	"experimental_class", // ExperimentalClass = 5
]);

export const issues = pgTable(
	"issues",
	{
		id,
		title: varchar("title", { length: 150 }).notNull(),
		description: text("description").notNull(),
		project: varchar("project", { length: 150 }).notNull(),
		issueSection: issueSection("issue_section").notNull(),
		issueType: issueType("issue_type").notNull(),
		issueStatus: issueStatus("issue_status").notNull(),
		priority: issuePriority("priority").notNull(),
		createdById: varchar("created_by_id", { length: 16 }).notNull(),
		assigneeId: varchar("assignee_id", { length: 16 }),
		versionImplemented: varchar("version_implemented", { length: 50 }),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => [
		index("issues__assignee_id_idx").on(table.assigneeId),
		index("issues__created_by_id_idx").on(table.createdById),
	],
)
