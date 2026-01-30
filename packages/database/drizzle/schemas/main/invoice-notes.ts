import { char, foreignKey, index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { invoices } from './invoices'

export const invoiceNotes = pgTable(
    'invoice_notes',
    {
        id,
        invoiceId: varchar('invoice_id', { length: 16 }).notNull(),
        message: text('message').notNull(),
        schoolRegistry: char('school_registry', { length: 14 }).notNull(),
        userName: varchar('user_name', { length: 150 }).notNull(),
        userProfilePicture: varchar('user_profile_picture', { length: 200 }),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('idx_invoicenotes_invoiceid_removedat').on(table.invoiceId, table.deletedAt),
        index('invoice_notes__invoice_id_idx').on(table.invoiceId),
        foreignKey({
            columns: [table.invoiceId],
            foreignColumns: [invoices.id],
            name: 'invoice_notes_fkey'
        })
    ]
)
