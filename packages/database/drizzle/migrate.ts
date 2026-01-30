import { migrate } from "drizzle-orm/neon-serverless/migrator"
import { createMainDbClient } from "../src/clients/main"

async function runMigration() {
	const db = createMainDbClient({
		usePool: false,
	})

	try {
		console.log("✨ Database migration started\n")

		await migrate(db, { migrationsFolder: "./drizzle/migrations/main" })

		console.log("✨ Database migration completed\n")

		process.exit(0)
	} catch (error) {
		console.error("❌ Database migration failed:", error)

		process.exit(1)
	}
}

runMigration().catch((error) => {
	console.error("❌ Error migrating Database:", error)

	process.exit(1)
})
