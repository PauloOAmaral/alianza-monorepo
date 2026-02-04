import { decimal, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const sellers = pgTable('sellers', {
    id,
    tenantId: varchar('tenant_id', { length: 16 }).notNull(),
    referralCode: varchar('referral_code', { length: 10 }).notNull(),
    leadPrefix: varchar('lead_prefix', { length: 2 }).notNull(),
    dailyToSell: decimal('daily_to_sell', { precision: 18, scale: 2 }),
    dailyExperimentalClass: integer('daily_experimental_class'),
    pixelId: text('pixel_id'),
    pixelSecret: text('pixel_secret'),
    isActive,
    createdAt,
    updatedAt,
    deletedAt
})
