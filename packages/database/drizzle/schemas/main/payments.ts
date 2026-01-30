import { boolean, decimal, foreignKey, index, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { paymentType as paymentTypeEnum } from '../common'
import { invoices } from './invoices'

export const paymentStatus = pgEnum('payment_status', [
    'pending', // Pendente = 0
    'paid', // Pago = 1
    'canceled', // Cancelado = 2
    'refunded', // Estornado = 3
    'overdue' // Atrasado = 4
])

export const payments = pgTable(
    'payments',
    {
        id,
        invoiceId: varchar('invoice_id', { length: 16 }).notNull(),
        description: varchar('description', { length: 500 }).notNull(),
        docSentLink: varchar('doc_sent_link', { length: 300 }),
        amount: decimal('amount', { precision: 18, scale: 2 }).notNull(),
        tid: varchar('tid', { length: 200 }),
        nsu: varchar('nsu', { length: 200 }),
        url: text('url'),
        pixCopyAndPaste: text('pix_copy_and_paste'),
        isOnSale: boolean('is_on_sale').notNull(),
        type: paymentTypeEnum('type').notNull(),
        status: paymentStatus('status').default('pending').notNull(),
        originPaid: varchar('origin_paid', { length: 36 }),
        dueAt: timestamp('due_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }),
        paidAt: timestamp('paid_at', {
            precision: 6,
            withTimezone: true,
            mode: 'date'
        }),
        isManual: boolean('is_manual').notNull(),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('idx_payments_invoice_status').on(table.invoiceId, table.status, table.deletedAt),
        index('idx_payments_invoice_status_removed').on(table.invoiceId, table.status, table.deletedAt),
        index('payments__invoice_id_idx').on(table.invoiceId),
        index('payments_deleted_at_idx').on(table.deletedAt),
        foreignKey({
            columns: [table.invoiceId],
            foreignColumns: [invoices.id],
            name: 'payments_fkey'
        })
    ]
)
