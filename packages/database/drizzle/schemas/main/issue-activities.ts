import { foreignKey, index, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'
import { userTenants } from '../common'
import { issues } from './issues'

export const issueActivityType = pgEnum('issue_activity_type', [
    'create', // Create = 0
    'update', // Update = 1
    'delete', // Delete = 2
    'comment', // Comment = 3
    'comment_mention', // CommentMention = 4
    'assign', // Assign = 5
    'attach', // Attach = 6
    'detach', // Detach = 7
    'status_change', // StatusChange = 8
    'priority_change', // PriorityChange = 9
    'new_release' // NewRelease = 10
])

export const issueActivities = pgTable(
    'issue_activities',
    {
        id,
        description: varchar('description', { length: 500 }).notNull(),
        userTenantId: varchar('user_tenant_id', { length: 16 }).notNull(),
        issueId: varchar('issue_id', { length: 16 }).notNull(),
        issueActivityType: issueActivityType('issue_activity_type').notNull(),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('issue_activities__issue_id_idx').on(table.issueId),
        index('issue_activities__user_tenant_id_idx').on(table.userTenantId),
        foreignKey({
            columns: [table.issueId],
            foreignColumns: [issues.id],
            name: 'issue_activities_fkey'
        }),
        foreignKey({
            columns: [table.userTenantId],
            foreignColumns: [userTenants.id],
            name: 'issue_activities_user_tenant_id_fkey'
        })
    ]
)
