import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../../utils/fields"

export const medias = pgTable("medias", {
    id,
    name: text("name").notNull(),
    path: text("path").notNull(),
    type: varchar("type", { length: 128 }).notNull(),
    createdAt,
    updatedAt,
})
