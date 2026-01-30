import { foreignKey, index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'
import { userTenants } from '../common'
import { issues } from './issues'

export const issueComments = pgTable(
    'issue_comments',
    {
        id,
        issueId: varchar('issue_id', { length: 16 }).notNull(),
        userTenantId: varchar('user_tenant_id', { length: 16 }).notNull(),
        message: text('message').notNull(),
        versionImplemented: varchar('version_implemented', { length: 50 }),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('issue_comments__issue_id_idx').on(table.issueId),
        index('issue_comments__user_tenant_id_idx').on(table.userTenantId),
        foreignKey({
            columns: [table.issueId],
            foreignColumns: [issues.id],
            name: 'issue_comments_fkey'
        }),
        foreignKey({
            columns: [table.userTenantId],
            foreignColumns: [userTenants.id],
            name: 'issue_comments_user_tenant_id_fkey'
        })
    ]
)
