import { sql } from 'drizzle-orm'
import { createMainDbClient } from '../src/clients/main'

/**
 * Drop public schema (tabelas + tabela de migrations do Drizzle).
 * Deixa o banco zerado para rodar todas as migrations de novo do zero.
 *
 * Usage: pnpm db:drop:admin
 */
async function dropTables() {
    try {
        const db = createMainDbClient({ usePool: false })

        console.log('🗑️  Dropping public schema (all tables + Drizzle migrations table)...\n')

        await db.execute(sql`DROP SCHEMA public CASCADE`)
        await db.execute(sql`CREATE SCHEMA public`)
        await db.execute(sql`GRANT ALL ON SCHEMA public TO public`)

        console.log('✨ Schema zerado. Rode db:migrate:admin para aplicar todas as migrations de novo.\n')

        process.exit(0)
    } catch (error) {
        console.error('❌ Drop tables failed:', error)
        process.exit(1)
    }
}

dropTables().catch(error => {
    console.error('❌ Error:', error)
    process.exit(1)
})
