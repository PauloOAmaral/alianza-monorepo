import { boolean, char, foreignKey, index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const financialResponsibles = pgTable(
    'financial_responsibles',
    {
        id,
        isActive,
        name: varchar('name', { length: 300 }).notNull(),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        verificationToken: char('verification_token', { length: 10 }),
        verifiedAt: timestamp('verified_at'),
        sendNotificationsBlock: boolean('send_notifications_block').default(false).notNull(),
        customerExtId: varchar('customer_ext_id', { length: 200 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => []
)
