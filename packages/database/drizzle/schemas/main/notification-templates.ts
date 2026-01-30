import { index, integer, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const notificationTemplates = pgTable(
    'notification_templates',
    {
        id,
        name: varchar('name', { length: 150 }).notNull(),
        subject: text('subject').notNull(),
        title: varchar('title', { length: 100 }).notNull(),
        emailMessage: text('email_message'),
        appMessage: varchar('app_message', { length: 150 }),
        zapTemplateName: varchar('zap_template_name', { length: 50 }),
        zapTemplateData: text('zap_template_data'),
        twillioTemplateName: varchar('twillio_template_name', { length: 50 }),
        type: integer('type').notNull(),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [uniqueIndex('notification_templates__name_key').on(table.name), index('notification_templates_deleted_at_idx').on(table.deletedAt)]
)
