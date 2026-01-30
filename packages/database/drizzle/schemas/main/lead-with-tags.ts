import { foreignKey, index, integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { leadTags } from './lead-tags'
import { leads } from './leads'

export const leadWithTags = pgTable(
    'lead_with_tags',
    {
        id,
        leadId: varchar('lead_id', { length: 16 }).notNull(),
        leadTagId: varchar('lead_tag_id', { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        uniqueIndex('lead_with_tags__lead_id__lead_tag_id_key').on(table.leadId, table.leadTagId),
        index('lead_with_tags__lead_tag_id_idx').on(table.leadTagId),
        index('lead_with_tags_deleted_at_idx').on(table.deletedAt),
        foreignKey({
            columns: [table.leadId],
            foreignColumns: [leads.id],
            name: 'lead_with_tags__lead_id_fkey'
        }),
        foreignKey({
            columns: [table.leadTagId],
            foreignColumns: [leadTags.id],
            name: 'lead_with_tags__lead_tag_id_fkey'
        })
    ]
)
