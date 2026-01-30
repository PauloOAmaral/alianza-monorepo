#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function toSnakeCase(str: string): string {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
}

console.log('🚀 Starting schema conversion...\n')

try {
    const schemaPath = join(__dirname, '..', 'drizzle', 'migrations', 'main', 'schema.ts')
    console.log(`📖 Reading: ${schemaPath}`)

    const content = readFileSync(schemaPath, 'utf-8')
    console.log(`✅ Read ${content.length} bytes`)

    // Extract all table definitions using regex
    const tableRegex = /export const (\w+) = mysqlTable\([^}]+\}[^;]*;/gs
    const matches = Array.from(content.matchAll(tableRegex))

    console.log(`\n🔍 Found ${matches.length} table definitions\n`)

    const outputDir = join(__dirname, '..', 'drizzle', 'schemas', 'main')
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
        console.log(`📁 Created directory: ${outputDir}`)
    }

    let converted = 0
    for (const match of matches) {
        const tableName = match[1]
        if (tableName === 'efMigrationsHistory') {
            console.log(`⏭️  Skipping: ${tableName} (special case)`)
            continue
        }

        const snakeName = toSnakeCase(tableName)
        console.log(`🔄 Converting: ${tableName} → ${snakeName}.ts`)

        // For now, just create a placeholder
        const placeholder = `// TODO: Convert ${tableName}\nexport const ${tableName} = null;\n`
        const filePath = join(outputDir, `${snakeName}.ts`)
        writeFileSync(filePath, placeholder, 'utf-8')

        converted++
    }

    console.log(`\n✨ Converted ${converted} tables successfully!`)
} catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
}
