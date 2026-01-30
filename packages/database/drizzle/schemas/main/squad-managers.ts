import { foreignKey, index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { squads } from './squads'

export const squadManagers = pgTable(
    'squad_managers',
    {
        id,
        userAdminId: varchar('user_admin_id', { length: 16 }).notNull(),
        squadId: varchar('squad_id', { length: 16 }).notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('squad_managers_deleted_at_idx').on(table.deletedAt),
        index('squad_managers__squad_id_idx').on(table.squadId),
        foreignKey({
            columns: [table.squadId],
            foreignColumns: [squads.id],
            name: 'squad_managers_fkey'
        })
    ]
)
