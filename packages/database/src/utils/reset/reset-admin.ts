import { sql } from "drizzle-orm"
import { createMainDbClient } from "../../clients/main"

async function reset() {
    console.log("⏳ Resetting Admin database...")

    try {
        const db = createMainDbClient({ usePool: false })

        await db.transaction(async (tx) => {
            // Obter lista de todas as tabelas
            const result = await tx.execute(sql`
                SELECT tablename
                FROM pg_tables
                WHERE schemaname = 'public'
            `)

            // Extrair nomes das tabelas
            const tables = result.rows.map((row: any) => row.tablename)

            // Dropar todas as tabelas com CASCADE para remover dependências
            for (const tableName of tables) {
                await tx.execute(sql.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`))
                console.log(`Dropped table: ${tableName}`)
            }
        })
    } catch (error) {
        console.error("❌ Error resetting Admin database:", error)

        process.exit(1)
    }

    console.log("✅ Admin database reset completed successfully\n")

    process.exit(0)
}

reset().catch((error) => {
    console.error("❌ Error resetting Admin database:", error)

    process.exit(1)
})
