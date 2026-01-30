---
name: route-generator
description: Generates React Router 7 routes following Alianza patterns. Use when creating new routes, pages, or screens in the admin app.
---

# React Router 7 Route Patterns

When creating routes in the admin app, follow these exact patterns.

## File Structure

### Listing Route (`_app.[resource]/`)
```
app/routes/_app.[resource]/
├── route.tsx                        # Main component with loader + action
├── [resource]-table.tsx             # Table display component
├── [resource]-table-row-button.tsx  # Row action buttons (edit/delete)
├── [resource]-table-pagination.tsx  # Pagination component
├── [resource]-table-action-bar.tsx  # Search/filter + create button
├── route-params.ts                  # URL search params definition
└── schema.ts                        # Delete intent schema only
```

### Add Route (`_app.[resource].add/`)
```
app/routes/_app.[resource].add/
├── route.tsx                        # Loader + action
├── add-form.tsx                     # Form component
└── schema.ts                        # Add form schema with input/output types
```

### Edit Route (`_app.[resource].$id.edit/`)
```
app/routes/_app.[resource].$id.edit/
├── route.tsx                        # Loader + action
├── edit-form.tsx                    # Form component
└── schema.ts                        # Edit form schema with input/output types
```

## Listing Route Pattern

### route.tsx
```typescript
import { clientActionHandler } from "~/utils/client/client-action-handler"
import { parseFormDataWithZod } from "@alianza/utils/forms"
import { dataWithError, dataWithSuccess } from "~/utils/server/toasts"
import { createRequest } from "~/utils/server/request-builder"
import { requireSession, requireTenantRole, requirePermission } from "~/middleware/session-middleware"
import { getI18nextServerInstance } from "~/middleware/i18next-middleware"
import { deleteItemCommand, getItemsQuery } from "@alianza/application/admin"
import { deleteItemSchema } from "./schema"
import { itemsSearchParamsLoader } from "./route-params"
import { ItemsTable } from "./items-table"
import { ItemsTablePagination } from "./items-table-pagination"
import { ItemsTableActionBar } from "./items-table-action-bar"
import type { Route } from "./+types/route"

export const clientAction = clientActionHandler

export async function action({ request }: Route.ActionArgs) {
    requireSession()
    requireTenantRole(["admin_admin", "system_admin"])
    const { t } = getI18nextServerInstance()
    const formData = await request.formData()
    const intent = formData.get("intent") as string

    if (!intent) {
        return dataWithError({ success: false }, t("errors.unexpected"), { status: 400 })
    }

    switch (intent) {
        case "delete-item": {
            requirePermission(["common_delete_items"])

            const { success, value } = await parseFormDataWithZod(formData, deleteItemSchema)

            if (!success) {
                return dataWithError({ success: false }, t("errors.unexpected"), { status: 400 })
            }

            await deleteItemCommand(createRequest({ id: value.id }))

            return dataWithSuccess({ success: true }, t("success.item_deleted"))
        }
        default:
            return dataWithError({ success: false }, t("errors.unexpected"), { status: 400 })
    }
}

export async function loader({ request }: Route.LoaderArgs) {
    requireSession()
    requireTenantRole(["admin_admin", "system_admin"])
    requirePermission(["common_read_items"])

    const items = getItemsQuery(
        createRequest({
            ...itemsSearchParamsLoader(request.url),
        }),
    ).then((result) => ({
        data: result.data?.data ?? [],
        count: result.data?.count ?? 0,
    }))

    return { items }
}

export default function ItemsRoute() {
    return (
        <div className="flex flex-col gap-4">
            <ItemsTableActionBar />
            <ItemsTable />
            <ItemsTablePagination />
        </div>
    )
}
```

### schema.ts (Listing - Delete Only)
```typescript
import { z } from "zod"

export const deleteItemSchema = z.object({
    intent: z.literal("delete-item"),
    id: z.string(),
})

export type DeleteItemType = z.infer<typeof deleteItemSchema>
```

### route-params.ts
```typescript
import { createLoader, parseAsInteger, parseAsString } from "nuqs"

export const itemsSearchParams = {
    query: parseAsString.withDefault("").withOptions({ throttleMs: 500 }),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(20),
}

export const itemsSearchParamsLoader = createLoader(itemsSearchParams)
```

## Add Route Pattern

### route.tsx
```typescript
import { parseFormDataWithZod } from "@alianza/utils/forms"
import { dataWithError, redirectWithSuccess } from "~/utils/server/toasts"
import { createRequest } from "~/utils/server/request-builder"
import { requireSession, requireTenantRole, requirePermission } from "~/middleware/session-middleware"
import { getI18nextServerInstance } from "~/middleware/i18next-middleware"
import { createItemCommand } from "@alianza/application/admin"
import { addItemSchema } from "./schema"
import { AddItemForm } from "./add-form"
import type { Route } from "./+types/route"

export async function action({ request }: Route.ActionArgs) {
    requireSession()
    requireTenantRole(["admin_admin", "system_admin"])
    requirePermission(["common_create_items"])

    const formData = await request.formData()
    const { t } = getI18nextServerInstance()

    const { success, value } = await parseFormDataWithZod(formData, addItemSchema)

    if (!success) {
        return dataWithError({ success: false }, t("errors.unexpected"), { status: 400 })
    }

    await createItemCommand(
        createRequest({
            name: value.name,
            description: value.description || "",
            isActive: value.isActive,
        }),
    )

    const url = new URL(request.url)

    return redirectWithSuccess(`/items${url.search}`, t("success.item_created"))
}

export async function loader() {
    requireSession()
    requireTenantRole(["admin_admin", "system_admin"])
    requirePermission(["common_create_items"])

    return {}
}

export default function AddItemRoute() {
    return <AddItemForm />
}
```

### schema.ts (Add)
```typescript
import { z } from "zod"

export const addItemSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Nome é obrigatório" })
        .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    description: z
        .string()
        .max(500, { message: "Descrição deve ter no máximo 500 caracteres" })
        .optional(),
    isActive: z
        .preprocess((value) => {
            if (typeof value === "string") {
                return value === "true"
            }

            return value
        }, z.boolean())
        .default(false),
})

export type AddItemInputType = z.input<typeof addItemSchema>
export type AddItemOutputType = z.output<typeof addItemSchema>
```

## Edit Route Pattern

### route.tsx
```typescript
import { parseFormDataWithZod } from "@alianza/utils/forms"
import { dataWithError, redirectWithSuccess } from "~/utils/server/toasts"
import { createRequest } from "~/utils/server/request-builder"
import { requireSession, requireTenantRole, requirePermission } from "~/middleware/session-middleware"
import { getI18nextServerInstance } from "~/middleware/i18next-middleware"
import { getItemByIdQuery, updateItemCommand } from "@alianza/application/admin"
import { editItemSchema } from "./schema"
import { EditItemForm } from "./edit-form"
import type { Route } from "./+types/route"

export async function action({ request, params: { id } }: Route.ActionArgs) {
    requireSession()
    requirePermission(["common_update_items"])

    const { t } = getI18nextServerInstance()

    if (!id) {
        return dataWithError({ success: false }, t("errors.not_found"), { status: 404 })
    }

    const formData = await request.formData()
    const { success, value } = await parseFormDataWithZod(formData, editItemSchema)

    if (!success) {
        return dataWithError({ success: false }, t("errors.unexpected"), { status: 400 })
    }

    await updateItemCommand(
        createRequest({
            id,
            name: value.name,
            description: value.description || "",
            isActive: value.isActive,
        }),
    )

    const url = new URL(request.url)

    return redirectWithSuccess(`/items${url.search}`, t("success.item_updated"))
}

export async function loader({ params: { id } }: Route.LoaderArgs) {
    requireSession()
    requirePermission(["common_update_items"])

    const result = await getItemByIdQuery(createRequest({ id }))

    return { item: result.data }
}

export default function EditItemRoute() {
    return <EditItemForm />
}
```

## Key Rules

1. **Always export `clientAction = clientActionHandler`** for listing routes
2. **Use intent pattern** for multiple actions in listing routes
3. **Check permissions inside switch cases** for specific operations
4. **Preserve search params** in redirects: `url.search`
5. **Run `bun typecheck`** after creating routes to generate types
6. **Use proper loader data access**: `useRouteLoaderData<typeof loader>("routes/_app.[resource].[action]")`
