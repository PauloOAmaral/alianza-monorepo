---
description: Run database operations (migrations, seeds, reset)
allowed-tools: Bash
argument-hint: [action] [project] [name?]
---

# Database Operations

Run database operations for a specific project.

## Arguments
- `$1` - Action: `generate`, `migrate`, `reset`, `seed`, `dbml`
- `$2` - Project name: `admin`
- `$3` - (Optional) Migration name for `generate` action

## Actions

### generate
Generate a new migration after schema changes.

```bash
cd packages/database && bun db:generate:$2 --name=$3
```

**Usage**: `/db generate admin add_categories`

### migrate
Apply pending migrations to the database.

```bash
cd packages/database && bun db:migrate:$2
```

**Usage**: `/db migrate admin`

### reset
Reset the database (drop all tables and re-apply migrations).

```bash
cd packages/database && bun db:reset:$2
```

**Usage**: `/db reset admin`

### seed
Seed the database with test data.

```bash
cd packages/database && bun db:seed:$2
```

**Usage**: `/db seed admin`

### dbml
Generate DBML diagram from schema.

```bash
cd packages/database && bun db:dbml:$2
```

**Usage**: `/db dbml admin`

## Important Notes

1. **NEVER create migration files manually** - Always use drizzle-kit via this command
2. **Run from packages/database directory** - Commands expect this working directory
3. **Migration naming**: Use snake_case (e.g., `add_categories`, `update_users_table`)
4. **After schema changes**: Always run `generate` then `migrate`

## Workflow Example

```
# 1. Modify schema in packages/database/src/schema/admin/
# 2. Generate migration
/db generate admin add_categories

# 3. Review the generated migration file
# 4. Apply migration
/db migrate admin

# 5. (Optional) Update DBML diagram
/db dbml admin
```

## Reference

- Schema files: `packages/database/src/schema/admin/`
- Migration files: `packages/database/drizzle/migrations/admin/`
- Database clients: `packages/database/src/clients/`
