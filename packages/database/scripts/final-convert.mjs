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

function convertLine(line, context) {
    // Skip ID field
    if (line.match(/\s*id:\s*int\(['"']Id['"']\).*autoincrement.*primaryKey/)) {
        context.hasStandardFields = true
        return '\tid,'
    }

    // Skip ExternalId
    if (line.match(/\s*externalId:\s*char\(['"']ExternalId['"']/)) {
        return null
    }

    // Skip old timestamps
    if (line.match(/\s*(createdAt|updatedAt|removedAt):\s*timestamp\(/)) {
        context.hasStandardFields = true
        return null
    }

    // Convert table name in mysqlTable call
    if (line.includes('mysqlTable(')) {
        return line.replace(/mysqlTable\(['"'](\w+)['"']/, (match, name) => {
            return `mysqlTable("${toSnakeCase(name)}"`
        })
    }

    // End of columns - add standard fields
    if (context.inColumns && line.trim() === '},') {
        const lines = []
        if (context.hasStandardFields) {
            lines.push('\tcreatedAt,')
            lines.push('\tupdatedAt,')
            lines.push('\tdeletedAt,')
        }
        lines.push(line)
        context.inColumns = false
        return lines.join('\n')
    }

    // Convert column definitions (keep prop camelCase, convert DB name to snake_case)
    if (context.inColumns && line.includes(':')) {
        let converted = line

        // Convert DB column names to snake_case but keep TypeScript props as camelCase
        converted = converted.replace(
            /(\s*)(\w+):\s*(\w+)\(['"']([^'"']+)['"']/g,
            (match, indent, prop, type, dbName) => {
                const snakeDb = toSnakeCase(dbName)

                // Track imports
                if (!context.imports.has(type)) {
                    context.imports.add(type)
                }

                // Check if this is a foreign key (ends with Id and is int type)
                const isForeignKey = prop.match(/Id$/) && type === 'int' && !line.includes('autoincrement')

                if (isForeignKey) {
                    context.imports.add('varchar')
                    // Keep prop as camelCase, but convert DB name
                    return `${indent}${prop}: varchar("${snakeDb}", { length: 16 }`
                }

                // Keep TypeScript property name as-is (camelCase), convert DB name to snake_case
                return `${indent}${prop}: ${type}("${snakeDb}"`
            }
        )

        return converted
    }

    // Skip indexes on id or externalId
    if (line.includes('table.id)') || line.includes('table.externalId')) {
        return null
    }

    // Convert RemovedAt to deleted_at in indexes
    if (line.includes('RemovedAt') || line.includes('removedAt')) {
        line = line.replace(/removedAt/g, 'deletedAt').replace(/RemovedAt/g, 'deleted_at')
    }

    // Convert index names
    if (line.match(/\s*(index|uniqueIndex)\(/)) {
        const isUnique = line.includes('uniqueIndex')
        context.imports.add(isUnique ? 'uniqueIndex' : 'index')

        let converted = line.replace(/['"']IX_[^'"']+['"']/g, (match) => {
            const name = match.slice(1, -1)
            const suffix = isUnique ? '_key' : '_idx'
            return `"${toSnakeCase(name.replace(/^IX_/, ''))}${suffix}"`
        })

        // Don't convert table.propertyName - keep camelCase
        return converted
    }

    // Track foreign table references
    if (line.includes('foreignColumns:')) {
        const refMatch = line.match(/\[(\w+)\.id\]/)
        if (refMatch) {
            context.foreignTables.add(refMatch[1])
        }
    }

    // Add foreignKey to imports if found
    if (line.includes('foreignKey(')) {
        context.imports.add('foreignKey')
    }

    // Convert FK constraint names
    if (line.includes('name:') && line.includes('FK_')) {
        return line.replace(/name:\s*['"']FK_[^'"']+['"']/g, () => {
            return `name: "${context.currentTableSnake}_fkey"`
        })
    }

    return line
}

function convertTable(table) {
    const context = {
        currentTable: table.name,
        currentTableSnake: toSnakeCase(table.name),
        inColumns: false,
        inConstraints: false,
        hasStandardFields: false,
        imports: new Set(['mysqlTable']),
        foreignTables: new Set()
    }

    const result = []

    for (let i = 0; i < table.lines.length; i++) {
        const line = table.lines[i]

        // Detect when we enter columns section
        if (line.includes('mysqlTable(')) {
            context.inColumns = true
        }

        // Detect when we enter constraints section
        if (line.includes('(table) => [')) {
            context.inColumns = false
            context.inConstraints = true
        }

        const converted = convertLine(line, context)

        if (converted === null) {
            continue // Skip this line
        }

        if (typeof converted === 'string') {
            result.push(converted)
        }
    }

    return {
        code: result.join('\n'),
        imports: Array.from(context.imports).filter(i => i !== 'mysqlTable').sort(),
        foreignTables: Array.from(context.foreignTables).sort()
    }
}

function extractTableDefinitions(content) {
    const tables = []
    const lines = content.split('\n')

    let currentTable = null
    let braceDepth = 0
    let inTable = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

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

            for (const char of line) {
                if (char === '{') braceDepth++
                if (char === '}') braceDepth--
            }

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

function generateFile(table, conversion) {
    const lines = []

    // Imports
    if (conversion.imports.length > 0) {
        lines.push(`import { mysqlTable, ${conversion.imports.join(', ')} } from "drizzle-orm/mysql-core"`)
    } else {
        lines.push(`import { mysqlTable } from "drizzle-orm/mysql-core"`)
    }

    lines.push(`import { id, createdAt, updatedAt, deletedAt } from "../../utils/fields"`)

    if (conversion.foreignTables.length > 0) {
        for (const foreignTable of conversion.foreignTables) {
            const snakeName = toSnakeCase(foreignTable)
            lines.push(`import { ${foreignTable} } from "./${snakeName}"`)
        }
    }

    lines.push('')
    lines.push(conversion.code)

    return lines.join('\n')
}

// Main
console.log('🚀 Starting final schema conversion...')
console.log('📋 Rules:')
console.log('   - Table names in DB: snake_case')
console.log('   - Column names in DB: snake_case')
console.log('   - TypeScript properties: camelCase')
console.log('')

const schemaPath = join(__dirname, '..', 'drizzle', 'migrations', 'main', 'schema.legacy.ts')
const outputDir = join(__dirname, '..', 'drizzle', 'schemas', 'main')

console.log(`📖 Reading: ${schemaPath}`)
const content = readFileSync(schemaPath, 'utf-8')
console.log(`✅ Read ${(content.length / 1024).toFixed(2)} KB`)

console.log('\n🔍 Extracting tables...')
const tables = extractTableDefinitions(content)
console.log(`✅ Found ${tables.length} tables\n`)

const tablesToConvert = tables.filter(t => t.name !== 'efMigrationsHistory')
console.log(`📝 Converting ${tablesToConvert.length} tables\n`)

if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
}

let converted = 0
for (const table of tablesToConvert) {
    const snakeTableName = toSnakeCase(table.name)
    const conversion = convertTable(table)
    const fileContent = generateFile(table, conversion)

    const filePath = join(outputDir, `${snakeTableName}.ts`)
    writeFileSync(filePath, fileContent, 'utf-8')

    converted++
    if (converted % 20 === 0) {
        console.log(`   ✓ ${converted}/${tablesToConvert.length}`)
    }
}

console.log(`\n✨ Converted ${converted} tables!`)
console.log(`📁 ${outputDir}`)
console.log(`\n✅ Done! Properties are in camelCase, DB names in snake_case.`)
