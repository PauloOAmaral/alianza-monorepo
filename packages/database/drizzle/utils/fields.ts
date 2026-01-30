import { sql } from 'drizzle-orm'
import { boolean, timestamp, varchar } from 'drizzle-orm/pg-core'
import { customAlphabet } from 'nanoid'

const nanoid16 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

const id = varchar('id', { length: 16 })
    .$defaultFn(() => nanoid16())
    .primaryKey()
    .notNull()

const createdAt = timestamp('created_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date'
})
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const updatedAt = timestamp('updated_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date'
})
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => new Date())

const deletedAt = timestamp('deleted_at', {
    precision: 6,
    withTimezone: true,
    mode: 'date'
})

const isActive = boolean('is_active').default(true).notNull()

export { id, createdAt, updatedAt, deletedAt, isActive }
