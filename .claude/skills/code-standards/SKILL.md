---
name: code-standards
description: Enforces Alianza coding standards when writing or reviewing code. Use when creating, editing, or reviewing TypeScript/React code to ensure consistency with project conventions.
---

# Alianza Coding Standards

When writing or reviewing code in this codebase, ALWAYS follow these standards:

## 1. Braces and Control Flow

Always use braces with new lines for if statements:

```typescript
// CORRECT
if (condition) {
    doSomething()
}

// INCORRECT - Never do this
if (condition) doSomething()
```

## 2. Empty Lines Between Code Groups

Always leave empty lines between different code groups:

```typescript
// CORRECT
const value = getValue()

if (condition) {
    doSomething()
}

return value

// INCORRECT
const value = getValue()
if (condition) {
    doSomething()
}
return value
```

## 3. Truthy Checks

Use simple truthy checks when possible:

```typescript
// PREFERRED - Simple truthy check
if (value) {
    updateData.field = value
}

// ONLY use explicit checks when falsy values (0, false, "") are valid
if (value !== undefined) {
    updateData.field = value
}
```

## 4. No Comments

Avoid adding comments unless absolutely necessary. Code should be self-explanatory through good naming and structure.

## 5. Architecture Rules

- **NO direct database access from apps** - All database operations MUST go through the application layer (`packages/application`)
- **One file per operation** - Each query or command gets its own file
- Apps should be thin clients focused on UI/UX

## 6. File Organization

- Query files go in `/queries/[project]/[feature]/`
- Command files go in `/commands/[project]/[feature]/`
- Route-specific components stay in route folders
- Shared components go in `/components/`

## 7. Type Exports

Always export types alongside schemas:

```typescript
export const mySchema = z.object({ ... })
export type MyInputType = z.input<typeof mySchema>
export type MyOutputType = z.output<typeof mySchema>
```

## 8. Formatting

Biome handles formatting automatically via hooks. Do not manually add formatting that conflicts with Biome.

## Reference

- Use `apps/admin` as the reference for all patterns
