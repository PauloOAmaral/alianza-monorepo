import { index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const leadTags = pgTable(
    'lead_tags',
    {
        id,
        name: varchar('name', { length: 100 }).notNull(),
        color: varchar('color', { length: 100 }),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('lead_tags_deleted_at_idx').on(table.deletedAt)]
)
