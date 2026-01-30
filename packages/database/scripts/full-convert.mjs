#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function toSnakeCase(str) {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
}

function extractTableDefinitions(content) {
    const tables = []
    const lines = content.split('\n')

    let currentTable = null
    let braceDepth = 0
    let inTable = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Detect table start
        if (line.match(/^export const (\w+) = mysqlTable\(/)) {
            const match = line.match(/^export const (\w+) = mysqlTable\(/)
            currentTable = {
                name: match[1],
                startLine: i,
                lines: []
            }
            inTable = true
            braceDepth = 0
        }

        if (inTable) {
            currentTable.lines.push(line)

            // Count braces
            for (const char of line) {
                if (char === '{') braceDepth++
                if (char === '}') braceDepth--
            }

            // Check if table definition ended
            if (line.includes(']);') && braceDepth === 0) {
                currentTable.endLine = i
                tables.push(currentTable)
                currentTable = null
                inTable = false
            }
        }
    }

    return tables
}

function convertTableDefinition(table) {
    const snakeTableName = toSnakeCase(table.name)
    const lines = [...table.lines]
    const result = []

    let inColumns = false
    let inConstraints = false
    let braceDepth = 0
    let hasStandardFields = false
    const foreignTables = new Set()
    const imports = new Set(['mysqlTable'])

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        // Convert table name
        if (line.includes('mysqlTable(')) {
            line = line.replace(/mysqlTable\("(\w+)"/, `mysqlTable("${snakeTableName}"`)
            result.push(line)
            inColumns = true
            continue
        }

        // Detect constraints section
        if (line.includes('(table) => [')) {
            inColumns = false
            inConstraints = true
            result.push(line)
            continue
        }

        // Handle columns
        if (inColumns && !inConstraints) {
            // Skip ID field (will use nanoid)
            if (line.match(/\s*id:\s*int\("Id"\).*autoincrement.*primaryKey/)) {
                result.push('\tid,')
                hasStandardFields = true
                continue
            }

            // Skip ExternalId
            if (line.match(/\s*externalId:\s*char\("ExternalId"/)) {
                continue
            }

            // Skip old timestamps
            if (line.match(/\s*(createdAt|updatedAt|removedAt):\s*timestamp\(/)) {
                hasStandardFields = true
                continue
            }

            // End of columns section
            if (line.trim() === '},') {
                if (hasStandardFields) {
                    result.push('\tcreatedAt,')
                    result.push('\tupdatedAt,')
                    result.push('\tdeletedAt,')
                }
                result.push(line)
                inColumns = false
                continue
            }

            // Convert column: property name and DB name
            const originalLine = line
            line = line.replace(/(\w+):\s*(\w+)\("([^"]+)"([^,]*)(,?)$/, (match, prop, type, dbName, rest, comma) => {
                const snakeProp = toSnakeCase(prop)
                const snakeDb = toSnakeCase(dbName)

                // Track imports
                if (!['int', 'varchar', 'char'].includes(type)) {
                    imports.add(type)
                }

                // Convert foreign key columns from int to varchar
                if (type === 'int' && prop.match(/Id$/) && !originalLine.includes('autoincrement')) {
                    imports.add('varchar')
                    return `${snakeProp}: varchar("${snakeDb}", { length: 16 })${rest}${comma}`
                }

                // Track other imports
                if (type === 'int' && !originalLine.includes('autoincrement')) {
                    imports.add('int')
                }
                if (type === 'varchar') imports.add('varchar')
                if (type === 'char') imports.add('char')

                return `${snakeProp}: ${type}("${snakeDb}"${rest}${comma}`
            })

            // Track additional imports from column definitions
            if (line.includes('boolean(')) imports.add('boolean')
            if (line.includes('timestamp(')) imports.add('timestamp')
            if (line.includes('datetime(')) imports.add('datetime')
            if (line.includes('decimal(')) imports.add('decimal')
            if (line.includes('text(')) imports.add('text')
            if (line.includes('longtext(')) imports.add('longtext')
            if (line.includes('bigint(')) imports.add('bigint')
            if (line.includes('date(')) imports.add('date')
            if (line.includes('time(')) imports.add('time')
            if (line.includes('json(')) imports.add('json')

            result.push(line)
            continue
        }

        // Handle constraints
        if (inConstraints) {
            // Skip empty lines or lines with just closing brackets before ]);
            if (line.trim() === ']);') {
                result.push(line)
                continue
            }

            // Skip indexes on Id or ExternalId
            if (line.includes('table.id)') || line.includes('table.externalId')) {
                continue
            }

            // Convert index
            if (line.match(/\s*(uniqueIndex|index)\(/)) {
                // Determine if it's index or uniqueIndex
                const isUnique = line.includes('uniqueIndex')
                imports.add(isUnique ? 'uniqueIndex' : 'index')

                // Convert index name
                line = line.replace(/"IX_[^"]+"/g, (match) => {
                    const name = match.slice(1, -1) // Remove quotes
                    const suffix = isUnique ? '_key' : '_idx'
                    const converted = toSnakeCase(name.replace(/^IX_/, '')) + suffix
                    return `"${converted}"`
                })

                // Convert table.column references
                line = line.replace(/table\.(\w+)/g, (match, prop) => {
                    return `table.${toSnakeCase(prop)}`
                })

                result.push(line)
                continue
            }

            // Convert foreign key
            if (line.match(/\s*foreignKey\(/)) {
                imports.add('foreignKey')
                result.push(line)
                continue
            }

            // Convert foreign key columns
            if (line.includes('columns:')) {
                line = line.replace(/table\.(\w+)/g, (match, prop) => {
                    return `table.${toSnakeCase(prop)}`
                })
                result.push(line)
                continue
            }

            // Convert foreign key reference and track referenced table
            if (line.includes('foreignColumns:')) {
                const match = line.match(/\[(\w+)\.id\]/)
                if (match) {
                    foreignTables.add(match[1])
                }
                result.push(line)
                continue
            }

            // Convert foreign key name
            if (line.includes('name:') && line.includes('FK_')) {
                line = line.replace(/name:\s*"FK_[^"]+"/g, () => {
                    // Simple naming: tablename_fkey
                    return `name: "${snakeTableName}_fkey"`
                })
                result.push(line)
                continue
            }

            // Other constraint lines
            result.push(line)
            continue
        }

        result.push(line)
    }

    return {
        code: result.join('\n'),
        imports: Array.from(imports).filter(i => i !== 'mysqlTable').sort(),
        foreignTables: Array.from(foreignTables).sort()
    }
}

function generateFile(table, conversion) {
    const lines = []

    // Imports from drizzle-orm
    const drizzleImports = conversion.imports
    if (drizzleImports.length > 0) {
        lines.push(`import { mysqlTable, ${drizzleImports.join(', ')} } from "drizzle-orm/mysql-core"`)
    } else {
        lines.push(`import { mysqlTable } from "drizzle-orm/mysql-core"`)
    }

    // Standard fields import
    lines.push(`import { id, createdAt, updatedAt, deletedAt } from "../../utils/fields"`)

    // Foreign table imports
    if (conversion.foreignTables.length > 0) {
        for (const foreignTable of conversion.foreignTables) {
            const snakeName = toSnakeCase(foreignTable)
            lines.push(`import { ${foreignTable} } from "./${snakeName}"`)
        }
    }

    // Empty line
    lines.push('')

    // Table definition
    lines.push(conversion.code)

    return lines.join('\n')
}

// Main execution
console.log('🚀 Starting full schema conversion...\n')

const schemaPath = join(__dirname, '..', 'drizzle', 'migrations', 'main', 'schema.ts')
const outputDir = join(__dirname, '..', 'drizzle', 'schemas', 'main')

console.log(`📖 Reading: ${schemaPath}`)
const content = readFileSync(schemaPath, 'utf-8')
console.log(`✅ Read ${(content.length / 1024).toFixed(2)} KB`)

console.log('\n🔍 Extracting table definitions...')
const tables = extractTableDefinitions(content)
console.log(`✅ Found ${tables.length} tables\n`)

// Skip special table
const tablesToConvert = tables.filter(t => t.name !== 'efMigrationsHistory')
console.log(`📝 Converting ${tablesToConvert.length} tables (skipping efMigrationsHistory)\n`)

// Create output directory
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
}

// Convert each table
let converted = 0
for (const table of tablesToConvert) {
    const snakeTableName = toSnakeCase(table.name)
    const conversion = convertTableDefinition(table)
    const fileContent = generateFile(table, conversion)

    const filePath = join(outputDir, `${snakeTableName}.ts`)
    writeFileSync(filePath, fileContent, 'utf-8')

    converted++
    if (converted % 20 === 0) {
        console.log(`   ✓ Converted ${converted}/${tablesToConvert.length} tables...`)
    }
}

console.log(`\n✨ Successfully converted ${converted} tables!`)
console.log(`📁 Output: ${outputDir}`)
console.log(`\n✅ Done!`)
