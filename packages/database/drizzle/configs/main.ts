import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { ENV } from "../../src/utils/env"

export default defineConfig({
    out: "./drizzle/migrations/main",
    schema: "./drizzle/schemas/index.ts",
    migrations: {
        table: "migrations",
    },
    dialect: "postgresql",
    dbCredentials: {
        url: ENV.MAIN_DIRECT_DATABASE_URL!,
    },
})
