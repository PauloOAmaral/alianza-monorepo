import { migrate } from "drizzle-orm/neon-serverless/migrator"
import { createMainDbClient } from "../../src/clients/main"

async function runMigration() {
    try {
        const db = createMainDbClient({ usePool: false })

        console.log("✨ Main database migration started\n")

        await migrate(db, { migrationsFolder: "./drizzle/migrations/main" })

        console.log("✨ Main database migration completed\n")

        process.exit(0)
    } catch (error) {
        console.error("❌ Main database migration failed:", error)

        process.exit(1)
    }
}

runMigration().catch((error) => {
    console.error("❌ Error migrating Main database:", error)

    process.exit(1)
})
