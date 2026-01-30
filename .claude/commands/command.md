---
description: Generate a CQRS command following application layer patterns
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: [project] [command-name]
---

# Generate CQRS Command

Generate a new command file following the project's CQRS patterns.

## Arguments
- `$1` - Project name (e.g., `admin`)
- `$2` - Command name in kebab-case (e.g., `create-product`)

## Instructions

1. **Determine the command type** based on the name:
   - Names starting with `create-` = **Create Command**
   - Names starting with `update-` = **Update Command**
   - Names starting with `delete-` = **Delete Command** (soft delete)
   - Other patterns = Ask user for clarification

2. **Create the command file** at:
   ```
   packages/application/src/commands/$1/[feature]/$2.ts
   ```

3. **For Create Commands**, include:
   - Input validation schema
   - Insert with `.returning({ id: table.id })`
   - Validate insert succeeded
   - Return created item ID

4. **For Update Commands**, include:
   - Wrap in `db.transaction()`
   - Check if item exists first (with soft delete filter)
   - Build `updateData` object conditionally using `!== undefined` checks
   - Always set `updatedAt: new Date()`

5. **For Delete Commands**, include:
   - Check if item exists first
   - Soft delete: `set({ deletedAt: new Date() })`
   - No return value needed

6. **Always include**:
   - Proper error handling with `ApplicationError`
   - Type export for create/update commands with meaningful returns

7. **Update the index file** at:
   ```
   packages/application/src/commands/$1/[feature]/index.ts
   ```
   Add: `export * from "./$2"`

## Example Usage

```
/command admin create-category
/command admin update-category
/command admin delete-category
```

## Reference Files

- Create pattern: `packages/application/src/commands/admin/forms/create-form.ts`
- Update pattern: `packages/application/src/commands/admin/courses/update-course.ts`
- Delete pattern: `packages/application/src/commands/admin/forms/delete-form.ts`
