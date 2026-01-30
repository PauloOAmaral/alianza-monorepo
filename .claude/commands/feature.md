---
description: Generate a complete feature with CQRS operations, routes, and translations
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: [app] [feature-name]
---

# Generate Complete Feature

Generate a complete feature end-to-end with all required components.

## Arguments
- `$1` - App name (e.g., `admin`)
- `$2` - Feature name in singular kebab-case (e.g., `category`)

## What Gets Created

### 1. CQRS Queries
- `packages/application/src/queries/$1/$2s/get-$2s.ts` - List with pagination
- `packages/application/src/queries/$1/$2s/get-$2-by-id.ts` - Single item
- `packages/application/src/queries/$1/$2s/index.ts` - Exports

### 2. CQRS Commands
- `packages/application/src/commands/$1/$2s/create-$2.ts` - Create
- `packages/application/src/commands/$1/$2s/update-$2.ts` - Update
- `packages/application/src/commands/$1/$2s/delete-$2.ts` - Delete (soft)
- `packages/application/src/commands/$1/$2s/index.ts` - Exports

### 3. Routes
- `apps/$1/app/routes/_app.$2s/` - Listing route (table, pagination, actions)
- `apps/$1/app/routes/_app.$2s.add/` - Add route (form)
- `apps/$1/app/routes/_app.$2s.$id.edit/` - Edit route (form)

### 4. Translations
Add to both `en.ts` and `pt.ts`:
- `titles.$2s`, `titles.add_$2`, `titles.edit_$2`
- `buttons.add_$2`, `buttons.edit_$2`, `buttons.delete_$2`
- `success.$2_created`, `success.$2_updated`, `success.$2_deleted`
- `empty_states.$2s_table`
- `placeholders.type_to_search_$2s`
- `dialogs.delete_$2.title`, `dialogs.delete_$2.description`
- `aria_labels.$2s_table`, `aria_labels.$2s_table_actions`

## Instructions

1. **Ask for field details** before generating:
   - What fields does this feature have? (name, description, etc.)
   - Are there any relationships to other entities?
   - What permissions should be used?

2. **Generate in order**:
   1. CQRS queries (so routes can import them)
   2. CQRS commands (so routes can import them)
   3. Routes (list → add → edit)
   4. Translations

3. **After generation**, run:
   ```bash
   bun typecheck && bun lint
   ```

## Example Usage

```
/feature admin category
/feature admin
```

## Important Notes

- Feature name should be SINGULAR (e.g., `category` not `categories`)
- The plural form is automatically derived (adds `s`)
- For complex plurals, you may need to manually adjust
- Reference only `apps/admin` patterns

