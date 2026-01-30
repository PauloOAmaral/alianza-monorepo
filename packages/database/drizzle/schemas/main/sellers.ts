import {
	decimal,
	foreignKey,
	index,
	integer,
	pgTable,
	text,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core"
import { createdAt, deletedAt, id, updatedAt } from "../../utils/fields"
import { tenants } from "../common"

export const sellers = pgTable(
	"sellers",
	{
		id,
		tenantId: varchar("tenant_id", { length: 16 }).notNull(),
		referralCode: varchar("referral_code", { length: 10 }).notNull(),
		leadPrefix: varchar("lead_prefix", { length: 2 }).notNull(),
		dailyToSell: decimal("daily_to_sell", { precision: 18, scale: 2 }),
		dailyExperimentalClass: integer("daily_experimental_class"),
		pixelId: text("pixel_id"),
		pixelSecret: text("pixel_secret"),
		status: integer("status").notNull(),
		createdAt,
		updatedAt,
		deletedAt,
	},
)
