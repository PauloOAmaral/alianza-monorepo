---
description: Generate a CQRS query following application layer patterns
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: [project] [query-name]
---

# Generate CQRS Query

Generate a new query file following the project's CQRS patterns.

## Arguments
- `$1` - Project name (e.g., `admin`)

## Instructions

1. **Determine the query type** based on the name:
   - Names with `by-id` (e.g., `get-product-by-id`) = **Single Item Query**
   - Other patterns = Ask user for clarification

2. **Create the query file** at:
   ```
   packages/application/src/queries/$1/[feature]/$2.ts
   ```

3. **For List Queries**, include:
   - Pagination schema: `query`, `page`, `limit`
   - Offset calculation: `(page - 1) * limit`
   - Soft delete filter: `isNull(fields.deletedAt)`
   - Search with `unaccent()` for accent-insensitive matching
   - Return `{ data, count }`

4. **For Single Item Queries**, include:
   - ID schema validation
   - Soft delete filter
   - Throw `ApplicationError("common_not_found")` if not found

5. **Always include**:
   - Type export: `export type QueryName = Awaited<ReturnType<typeof queryName>>`
   - Proper imports from `@alianza/database/clients/$1`

6. **Update the index file** at:
   ```
   packages/application/src/queries/$1/[feature]/index.ts
   ```
   Add: `export * from "./$2"`

## Example Usage

```
/query admin get-categories
/query admin get-category-by-id
```

## Reference Files

- Single item pattern: `packages/application/src/queries/admin/forms/get-form-by-id.ts`
