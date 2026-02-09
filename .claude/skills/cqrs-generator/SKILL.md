---
name: cqrs-generator
description: Generates CQRS queries and commands following Alianza application layer patterns. Use when creating database operations, queries, commands, or working with the application layer.
---

# CQRS Query and Command Patterns

When creating queries or commands in the application layer, follow these exact patterns.

## File Locations

- Queries: `packages/application/src/queries/[project]/[feature]/[operation].ts`
- Commands: `packages/application/src/commands/[project]/[feature]/[operation].ts`
- Always add export to the feature's `index.ts` file

## Query Pattern - Single Item

```typescript
import { createMainDbClient } from "@alianza/database/clients/main"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const schema = z.object({
    id: z.string().min(1),
})

export const getItemByIdQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id } = data

        const db = createMainDbClient()

        const result = await db.query.items.findFirst({
            columns: {
                id: true,
                name: true,
                description: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
            where(fields, { eq, isNull, and }) {
                return and(eq(fields.id, id), isNull(fields.deletedAt))
            },
        })

        if (!result) {
            throw new ApplicationError("common_not_found")
        }

        return result
    })

export type GetItemByIdQuery = Awaited<ReturnType<typeof getItemByIdQuery>>
```

## Query Pattern - Paginated List with Search

```typescript
import { createMainDbClient } from "@alianza/database/clients/main"
import { and, desc, isNull, type SQL, sql } from "@alianza/database/drizzle"
import { items } from "@alianza/database/schemas/admin"
import { z } from "zod"
import { createAction } from "../../../action-builder"

const schema = z.object({
    query: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(1000).default(20),
})

export const getItemsQuery = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { query, page, limit } = data
        const offset = (page - 1) * limit

        const db = createMainDbClient()

        const conditions: SQL<unknown>[] = [isNull(items.deletedAt)]

        if (query) {
            conditions.push(sql`unaccent(${items.name}) ilike unaccent(${`%${query}%`})`)
        }

        const whereCondition = conditions.length > 0 ? and(...conditions) : undefined

        const dataQuery = db.query.items.findMany({
            columns: {
                id: true,
                name: true,
                description: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
            where: whereCondition,
            orderBy: [desc(items.createdAt)],
            limit,
            offset,
        })

        const countQuery = db.$count(items, whereCondition)

        const [result, count] = await Promise.all([dataQuery, countQuery])

        return {
            data: result,
            count,
        }
    })

export type GetItemsQuery = Awaited<ReturnType<typeof getItemsQuery>>
```

## Command Pattern - Create

```typescript
import { createMainDbClient } from "@alianza/database/clients/main"
import { items } from "@alianza/database/schemas/admin"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const schema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export const createItemCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { name, description } = data

        const db = createMainDbClient()

        const [item] = await db
            .insert(items)
            .values({
                name,
                description,
                isActive: true,
            })
            .returning({ id: items.id })

        if (!item) {
            throw new ApplicationError("unexpected_error")
        }

        return item
    })
```

## Command Pattern - Update

```typescript
import { createMainDbClient } from "@alianza/database/clients/main"
import { eq } from "@alianza/database/drizzle"
import { items } from "@alianza/database/schemas/admin"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
})

export const updateItemCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id, name, description, isActive } = data

        const db = createMainDbClient()

        await db.transaction(async (tx) => {
            const existing = await tx.query.items.findFirst({
                columns: { id: true },
                where(fields, { eq, isNull, and }) {
                    return and(eq(fields.id, id), isNull(fields.deletedAt))
                },
            })

            if (!existing) {
                throw new ApplicationError("common_not_found")
            }

            const updateData: Partial<typeof items.$inferInsert> = {
                updatedAt: new Date(),
            }

            if (name !== undefined) {
                updateData.name = name
            }

            if (description !== undefined) {
                updateData.description = description
            }

            if (isActive !== undefined) {
                updateData.isActive = isActive
            }

            await tx.update(items).set(updateData).where(eq(items.id, id))
        })
    })
```

## Command Pattern - Delete (Soft Delete)

```typescript
import { createMainDbClient } from "@alianza/database/clients/main"
import { eq } from "@alianza/database/drizzle"
import { items } from "@alianza/database/schemas/admin"
import { z } from "zod"
import { createAction } from "../../../action-builder"
import { ApplicationError } from "../../../error"

const schema = z.object({
    id: z.string().min(1),
})

export const deleteItemCommand = createAction({ schema })
    .withData()
    .build(async ({ data }) => {
        const { id } = data

        const db = createMainDbClient()

        const existing = await db.query.items.findFirst({
            columns: { id: true },
            where(fields, { eq, isNull, and }) {
                return and(eq(fields.id, id), isNull(fields.deletedAt))
            },
        })

        if (!existing) {
            throw new ApplicationError("common_not_found")
        }

        await db
            .update(items)
            .set({ deletedAt: new Date() })
            .where(eq(items.id, id))
    })
```

## Key Rules

1. **Always use Query API**: Use `db.query` not `db.select()`
2. **Always check soft delete**: Filter with `isNull(fields.deletedAt)`
3. **One file per operation**: Never combine multiple operations
4. **Export types**: Always export `Awaited<ReturnType<typeof ...>>`
5. **Use transactions**: Wrap updates in `db.transaction()` when checking existence
6. **Search with unaccent**: Use `unaccent()` for accent-insensitive search
7. **Validate returns**: Always check if insert/update returned data
