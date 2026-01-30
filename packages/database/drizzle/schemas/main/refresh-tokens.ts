import { char, foreignKey, index, integer, pgTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { deletedAt, id, updatedAt } from '../../utils/fields'
import { userTenants } from '../common'

export const refreshTokens = pgTable(
    'refresh_tokens',
    {
        id,
        userTenantId: varchar('user_tenant_id', { length: 16 }).notNull(),
        userName: varchar('user_name', { length: 200 }).notNull(),
        userType: integer('user_type').notNull(),
        tokenHash: char('token_hash', { length: 64 }).notNull(),
        createdAt: timestamp('created_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        expiresAt: timestamp('expires_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        revokedAt: timestamp('revoked_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }),
        replacedByTokenHash: char('replaced_by_token_hash', { length: 64 }),
        updatedAt,
        deletedAt
    },
    table => [
        uniqueIndex('refresh_tokens__token_hash_key').on(table.tokenHash),
        index('refresh_tokens__user_type__user_tenant_id__revoked_at__expires_at_idx').on(table.userType, table.userTenantId, table.revokedAt, table.expiresAt),
        index('refresh_tokens__user_type__user_name_idx').on(table.userType, table.userName),
        foreignKey({
            columns: [table.userTenantId],
            foreignColumns: [userTenants.id],
            name: 'refresh_tokens_user_tenant_id_fkey'
        })
    ]
)
