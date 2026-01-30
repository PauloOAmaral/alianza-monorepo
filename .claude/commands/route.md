---
description: Generate a React Router 7 route with all required components
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: [app] [resource] [type]
---

# Generate React Router 7 Route

Generate a new route following the project's React Router 7 patterns.

## Arguments
- `$1` - App name (e.g., `admin`)
- `$2` - Resource name in kebab-case (e.g., `categories`)
- `$3` - Route type: `list`, `add`, `edit`, or `detail`

## Instructions

### For `list` type

Create folder: `apps/$1/app/routes/_app.$2/`

Create these files:
1. `route.tsx` - Main component with loader + action (intent pattern)
2. `$2-table.tsx` - Table display with Suspense/Await
3. `$2-table-row-button.tsx` - Row actions with delete dialog
4. `$2-table-pagination.tsx` - Pagination with nuqs
5. `$2-table-action-bar.tsx` - Search + create button
6. `route-params.ts` - Search params definition
7. `schema.ts` - Delete intent schema

### For `add` type

Create folder: `apps/$1/app/routes/_app.$2.add/`

Create these files:
1. `route.tsx` - Loader + action (no intent, single action)
2. `add-form.tsx` - Form component with DialogContent
3. `schema.ts` - Add schema with InputType/OutputType

### For `edit` type

Create folder: `apps/$1/app/routes/_app.$2.$id.edit/`

Create these files:
1. `route.tsx` - Loader (fetch by ID) + action
2. `edit-form.tsx` - Form with default values from loader
3. `schema.ts` - Edit schema with InputType/OutputType

### For `detail` type

Create folder: `apps/$1/app/routes/_app.$2.$id/`

Create these files:
1. `route.tsx` - Loader to fetch item by ID
2. `$2-detail.tsx` - Detail view component

## Key Patterns

1. **Always include** proper imports for:
   - `requireSession`, `requireTenantRole`, `requirePermission`
   - `createRequest` from request-builder
   - `getI18nextServerInstance` for translations
   - CQRS queries/commands from application layer

2. **For listing routes**:
   - Export `clientAction = clientActionHandler`
   - Use intent pattern with switch statement
   - Check permissions inside switch cases

3. **For add/edit routes**:
   - Use `redirectWithSuccess()` after mutation
   - Preserve search params in redirect: `url.search`

4. **After creation**, run:
   ```bash
   bun typecheck
   ```
   to generate route types

## Example Usage

```
/route admin categories list
/route admin categories add
/route admin categories edit
```

## Reference Files
