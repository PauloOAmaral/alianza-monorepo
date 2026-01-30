import { decimal, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, isActive, updatedAt } from "../../utils/fields"

export const collectors = pgTable("collectors", {
	id,
	userAdminId: varchar("user_admin_id", { length: 16 }).notNull(),
	dailyToCharge: decimal("daily_to_charge", { precision: 18, scale: 2 }),
	isActive,
	createdAt,
	updatedAt,
	deletedAt,
})
