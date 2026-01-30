import { sql } from 'drizzle-orm'
import { boolean, timestamp, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from '../../src/nanoid'

const id = varchar('id', { length: 16 })
    .$defaultFn(() => nanoid(16))
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
