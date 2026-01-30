import { Client } from 'pg'
import 'dotenv/config'
import { ENV } from './env'

async function createDatabase() {
    const connectionString = ENV.MAIN_DIRECT_DATABASE_URL

    if (!connectionString) {
        throw new Error('MAIN_DIRECT_DATABASE_URL environment variable is required')
    }

    const url = new URL(connectionString.replace(/^postgres(ql)?:\/\//, 'http://'))
    const databaseName = url.pathname.slice(1) || 'postgres'

    // Connect to postgres database to create target database
    const postgresConnectionString = connectionString.replace(/\/([^/]*)(\?.*)?$/, '/postgres$2')

    const client = new Client({ connectionString: postgresConnectionString })

    try {
        await client.connect()
        console.log(`⏳ Creating database '${databaseName}' if it doesn't exist...`)

        await client.query(`CREATE DATABASE "${databaseName}"`)

        console.log(`✅ Database '${databaseName}' is ready\n`)
    } catch (error: unknown) {
        const err = error as { code?: string }
        if (err?.code === '42P04') {
            console.log(`✅ Database '${databaseName}' already exists\n`)
        } else {
            throw error
        }
    } finally {
        await client.end()
    }
}

createDatabase().catch(error => {
    console.error('❌ Error creating database:', error)
    process.exit(1)
})
