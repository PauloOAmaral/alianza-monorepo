import * as fs from 'fs'
import * as path from 'path'

// Utility: Convert PascalCase to snake_case
function toSnakeCase(str: string): string {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
}

// Utility: Extract table name from export statement
function extractTableName(exportStatement: string): string | null {
    const match = exportStatement.match(/export const (\w+) = mysqlTable/)
    return match ? match[1] : null
}

// Utility: Convert column name from PascalCase to snake_case
function convertColumnName(columnDef: string): string {
    // Match patterns like: columnName: type("ColumnName", ...)
    return columnDef.replace(
        /(\w+):\s*(\w+)\("([^"]+)"/g,
        (match, propName, type, dbName) => {
            const snakeProp = toSnakeCase(propName)
            const snakeDb = toSnakeCase(dbName)
            return `${snakeProp}: ${type}("${snakeDb}"`
        }
    )
}

// Utility: Check if column is ID field
function isIdField(line: string): boolean {
    return /^\s*id:\s*int\(["']Id["']\).*autoincrement.*primaryKey/.test(line)
}

// Utility: Check if column is ExternalId
function isExternalIdField(line: string): boolean {
    return /^\s*externalId:\s*char\(["']ExternalId["']/.test(line)
}

// Utility: Check if column is timestamp (CreatedAt, UpdatedAt, RemovedAt)
function isTimestampField(line: string): boolean {
    return /^\s*(createdAt|updatedAt|removedAt):\s*timestamp\(["'](CreatedAt|UpdatedAt|RemovedAt)["']\)/.test(line)
}

// Utility: Convert foreign key column from int to varchar
function convertForeignKeyColumn(line: string): string {
    // Match: columnId: integer("ColumnId")
    const match = line.match(/^(\s*)(\w+):\s*int\(["']([^"']+)["']\)(.*)$/)
    if (match && match[2].endsWith('Id') || match && match[2].endsWith('_id')) {
        const [, indent, propName, dbName, rest] = match
        const snakeProp = toSnakeCase(propName)
        const snakeDb = toSnakeCase(dbName)
        return `${indent}${snakeProp}: varchar("${snakeDb}", { length: 16 })${rest}`
    }
    return line
}

// Utility: Convert index name
function convertIndexName(line: string, tableName: string): string {
    const snakeTable = toSnakeCase(tableName)

    // Remove indexes on Id or ExternalId
    if (/\.on\(table\.id\)/.test(line) || /\.on\(table\.externalId/.test(line)) {
        return ''
    }

    // Convert IX_TableName_Column to table_name_column_idx
    return line
        .replace(/index\(["']IX_\w+["']\)/g, (match) => {
            const name = match.match(/["']([^"']+)["']/)?.[1] || ''
            const snakeName = toSnakeCase(name.replace(/^IX_/, '')) + '_idx'
            return `index("${snakeName}")`
        })
        .replace(/uniqueIndex\(["']IX_\w+["']\)/g, (match) => {
            const name = match.match(/["']([^"']+)["']/)?.[1] || ''
            const snakeName = toSnakeCase(name.replace(/^IX_/, '')) + '_key'
            return `uniqueIndex("${snakeName}")`
        })
        .replace(/table\.(\w+)/g, (match, prop) => {
            return `table.${toSnakeCase(prop)}`
        })
}

// Utility: Convert foreign key constraint name
function convertForeignKeyConstraint(line: string, tableName: string): string {
    const snakeTable = toSnakeCase(tableName)

    // Convert FK_Table_RelatedTable_Column to table_column_fkey
    return line
        .replace(/name:\s*["']FK_\w+["']/g, (match) => {
            const name = match.match(/["']([^"']+)["']/)?.[1] || ''
            // Extract just the column part
            const parts = name.split('_')
            if (parts.length >= 3) {
                const column = toSnakeCase(parts[parts.length - 1])
                return `name: "${snakeTable}_${column}_fkey"`
            }
            return `name: "${snakeTable}_fkey"`
        })
        .replace(/columns:\s*\[table\.(\w+)\]/g, (match, prop) => {
            return `columns: [table.${toSnakeCase(prop)}]`
        })
        .replace(/foreignColumns:\s*\[(\w+)\.id\]/g, (match, tableName) => {
            return `foreignColumns: [${tableName}.id]`
        })
}

// Main: Parse and convert a single table
function convertTable(tableCode: string, tableName: string): { code: string; imports: Set<string>; foreignTables: Set<string> } {
    const lines = tableCode.split('\n')
    const result: string[] = []
    const imports = new Set<string>()
    const foreignTables = new Set<string>()
    const snakeTableName = toSnakeCase(tableName)

    let inColumns = false
    let inConstraints = false
    let hasStandardFields = false

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        // Skip empty lines at start
        if (!line.trim() && result.length === 0) continue

        // Detect table definition start
        if (line.includes('mysqlTable(')) {
            // Convert table name in definition
            line = line.replace(/mysqlTable\(["'](\w+)["']/, `mysqlTable("${snakeTableName}"`)
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

        // Handle columns section
        if (inColumns) {
            // Skip ID field (will be replaced)
            if (isIdField(line)) {
                hasStandardFields = true
                result.push('\tid,')
                continue
            }

            // Skip ExternalId
            if (isExternalIdField(line)) {
                continue
            }

            // Skip old timestamp fields
            if (isTimestampField(line)) {
                hasStandardFields = true
                continue
            }

            // Check if this is a closing brace (end of columns)
            if (line.trim() === '},') {
                // Add standard timestamp fields if we found old ones
                if (hasStandardFields) {
                    result.push('\tcreatedAt,')
                    result.push('\tupdatedAt,')
                    result.push('\tdeletedAt,')
                }
                result.push(line)
                inColumns = false
                continue
            }

            // Convert foreign key columns (int → varchar)
            if (line.includes(': integer(') && (line.includes('Id') || line.includes('_id'))) {
                line = convertForeignKeyColumn(line)

                // Track import needs
                if (!line.includes('autoincrement')) {
                    imports.add('varchar')
                }
            }

            // Convert column names
            line = convertColumnName(line)

            // Track other imports
            if (line.includes(': boolean(')) imports.add('boolean')
            if (line.includes(': timestamp(')) imports.add('timestamp')
            if (line.includes(': datetime(')) imports.add('datetime')
            if (line.includes(': decimal(')) imports.add('decimal')
            if (line.includes(': text(')) imports.add('text')
            if (line.includes(': longtext(')) imports.add('longtext')
            if (line.includes(': bigint(')) imports.add('bigint')
            if (line.includes(': date(')) imports.add('date')
            if (line.includes(': time(')) imports.add('time')
            if (line.includes(': json(')) imports.add('json')
            if (line.includes(': char(')) imports.add('char')
            if (line.includes(': varchar(')) imports.add('varchar')
            if (line.includes(': integer(')) imports.add('int')

            result.push(line)
            continue
        }

        // Handle constraints section
        if (inConstraints) {
            // Skip empty index/constraint lines
            const trimmed = line.trim()

            // Convert indexes
            if (trimmed.startsWith('index(') || trimmed.startsWith('uniqueIndex(')) {
                const converted = convertIndexName(line, tableName)
                if (converted) {
                    imports.add(trimmed.startsWith('index(') ? 'index' : 'uniqueIndex')
                    result.push(converted)
                }
                continue
            }

            // Convert foreign keys
            if (trimmed.startsWith('foreignKey(')) {
                imports.add('foreignKey')
                // Extract referenced table
                const refMatch = line.match(/foreignColumns:\s*\[(\w+)\.id\]/)
                if (refMatch) {
                    foreignTables.add(refMatch[1])
                }
                result.push(line)
                continue
            }

            // Handle foreign key properties (name, onDelete, etc)
            if (line.includes('name:') && line.includes('FK_')) {
                line = convertForeignKeyConstraint(line, tableName)
                result.push(line)
                continue
            }

            // Convert table.column references in constraints
            line = line.replace(/table\.(\w+)/g, (match, prop) => {
                return `table.${toSnakeCase(prop)}`
            })

            result.push(line)
            continue
        }

        result.push(line)
    }

    return {
        code: result.join('\n'),
        imports,
        foreignTables
    }
}

// Main: Generate complete file content for a table
function generateTableFile(tableName: string, tableCode: string): string {
    const { code, imports, foreignTables } = convertTable(tableCode, tableName)

    const lines: string[] = []

    // Add imports
    const drizzleImports = Array.from(imports).filter(i => i !== 'mysqlTable').sort()
    if (drizzleImports.length > 0) {
        lines.push(`import { mysqlTable, ${drizzleImports.join(', ')} } from "drizzle-orm/mysql-core"`)
    } else {
        lines.push(`import { mysqlTable } from "drizzle-orm/mysql-core"`)
    }

    // Add utils imports
    lines.push(`import { id, createdAt, updatedAt, deletedAt } from "../../utils/fields"`)

    // Add foreign table imports
    if (foreignTables.size > 0) {
        for (const foreignTable of Array.from(foreignTables).sort()) {
            const snakeName = toSnakeCase(foreignTable)
            lines.push(`import { ${foreignTable} } from "./${snakeName}"`)
        }
    }

    // Add empty line
    lines.push('')

    // Add table code
    lines.push(code)

    return lines.join('\n')
}

// Main: Extract all tables from schema file
function extractTables(schemaContent: string): Map<string, string> {
    const tables = new Map<string, string>()

    // Split by export const to find table definitions
    const parts = schemaContent.split(/(?=export const \w+ = mysqlTable)/)

    for (const part of parts) {
        const tableName = extractTableName(part)
        if (!tableName) continue

        // Skip the migrations history table (special case)
        if (tableName === 'efMigrationsHistory') {
            console.log(`Skipping special table: ${tableName}`)
            continue
        }

        tables.set(tableName, part.trim())
    }

    return tables
}

// Main execution
async function main() {
    console.log('Starting conversion script...')
    console.log('Current directory:', __dirname)

    const schemaPath = path.join(__dirname, '../drizzle/migrations/main/schema.ts')
    const outputDir = path.join(__dirname, '../drizzle/schemas/main')

    console.log('Schema path:', schemaPath)
    console.log('Output dir:', outputDir)

    console.log('Reading schema file...')
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8')
    console.log('Schema file size:', schemaContent.length, 'bytes')

    console.log('Extracting tables...')
    const tables = extractTables(schemaContent)
    console.log(`Found ${tables.size} tables to convert`)

    console.log('Creating output directory...')
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log('Converting tables...')
    let count = 0
    for (const [tableName, tableCode] of tables.entries()) {
        const snakeTableName = toSnakeCase(tableName)
        const fileName = `${snakeTableName}.ts`
        const filePath = path.join(outputDir, fileName)

        const fileContent = generateTableFile(tableName, tableCode)
        fs.writeFileSync(filePath, fileContent, 'utf-8')

        count++
        if (count % 10 === 0) {
            console.log(`Converted ${count}/${tables.size} tables...`)
        }
    }

    console.log(`✅ Successfully converted ${count} tables!`)
    console.log(`Output directory: ${outputDir}`)
}

main().catch(console.error)
