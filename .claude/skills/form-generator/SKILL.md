---
name: form-generator
description: Generates form components following Alianza React Hook Form + Zod patterns. Use when creating forms, form validation, dialogs, or table row actions.
---

# Form Component Patterns

When creating forms in the admin app, follow these exact patterns.

## Add Form Component

```typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@alianza/ui/button"
import { DialogBody, DialogContent, DialogFooter, DialogHeading } from "@alianza/ui/dialog"
import {
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormProvider,
} from "@alianza/ui/form-control"
import { Input } from "@alianza/ui/input"
import { Switch } from "@alianza/ui/switch"
import { objectToFormData } from "@alianza/utils/forms"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Link, useFetcher, useLocation, useNavigate, useRouteLoaderData } from "react-router"
import type { action, loader } from "./route"
import type { AddItemInputType, AddItemOutputType } from "./schema"
import { addItemSchema } from "./schema"

export function AddItemForm() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const loaderData = useRouteLoaderData<typeof loader>("routes/_app.items.add")
    const addItemFetcher = useFetcher<typeof action>()
    const addItemForm = useForm<AddItemInputType, AddItemOutputType>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
            name: "",
            description: "",
            isActive: true,
        },
    })

    function handleModalOpenChange(isOpen: boolean) {
        if (!isOpen) {
            navigate(`/items${location.search}`)
        }
    }

    async function onSubmitAddItem(values: AddItemInputType) {
        addItemFetcher.submit(objectToFormData(values), { method: "POST" })
    }

    return (
        <DialogContent isOpen onOpenChange={handleModalOpenChange} size="medium">
            <FormProvider {...addItemForm}>
                <form onSubmit={addItemForm.handleSubmit(onSubmitAddItem)}>
                    <DialogHeading>{t("titles.add_item")}</DialogHeading>
                    <DialogBody>
                        <FormField
                            control={addItemForm.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Switch
                                            isSelected={field.value as boolean}
                                            onChange={(value) => {
                                                addItemForm.setValue("isActive", value)
                                            }}
                                        >
                                            <FormLabel>{t("fields.is_active")}</FormLabel>
                                        </Switch>
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={addItemForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.name")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={addItemForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.description")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Link className="secondary-link" to={`/items${location.search}`}>
                            {t("buttons.cancel")}
                        </Link>
                        <Button isPending={addItemFetcher.state !== "idle"} type="submit">
                            {t("buttons.save")}
                        </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    )
}
```

## Edit Form Component

Key differences from Add:
- Use `loaderData?.item.*` for default values
- Add `selectedKey={field.value}` to Select components

```typescript
const loaderData = useRouteLoaderData<typeof loader>("routes/_app.items.$id.edit")
const editItemForm = useForm<EditItemInputType, EditItemOutputType>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
        name: loaderData?.item.name || "",
        description: loaderData?.item.description || "",
        isActive: loaderData?.item.isActive,
    },
})
```

## Table Row Button with Delete Dialog

```typescript
import { Button } from "@alianza/ui/button"
import { DialogBody, DialogContent, DialogFooter, DialogHeading } from "@alianza/ui/dialog"
import {
    DropDownMenuTrigger,
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuPopover,
} from "@alianza/ui/dropdown-menu"
import { useModal } from "@alianza/ui/hooks"
import { EllipsisVertical, Pencil, X } from "@alianza/ui/icons"
import { WithPermission } from "@alianza/ui/with-permission"
import { useTranslation } from "react-i18next"
import { useFetcher, useLocation } from "react-router"
import { usePermissions } from "~/hooks"
import type { action, loader } from "./route"

export function ItemsTableRowButton({
    item,
}: {
    item: Awaited<Awaited<ReturnType<typeof loader>>["items"]>["data"][number]
}) {
    const { t } = useTranslation()
    const { hasPermission } = usePermissions()
    const location = useLocation()
    const deleteItemFetcher = useFetcher<typeof action>()
    const { isOpen: isDeleteItemDialogOpen, setIsOpen: setIsDeleteItemDialogOpen } = useModal()

    async function handleDeleteItem() {
        await deleteItemFetcher.submit(
            { intent: "delete-item", id: item.id },
            { method: "post" },
        )

        setIsDeleteItemDialogOpen(false)
    }

    return (
        <>
            <DropDownMenuTrigger>
                <WithPermission
                    hasPermission={hasPermission(
                        ["common_update_items", "common_delete_items"],
                        "some",
                    )}
                    mode="disabled"
                >
                    <Button variant="action">
                        <EllipsisVertical className="w-4 h-4" />
                    </Button>
                </WithPermission>
                <DropdownMenuPopover>
                    <DropdownMenu aria-label={t("aria_labels.items_table_actions")}>
                        <WithPermission hasPermission={hasPermission("common_update_items")}>
                            <DropdownMenuItem
                                href={`/items/${item.id}/edit${location.search}`}
                            >
                                <Pencil className="h-4 w-4" /> {t("buttons.edit_item")}
                            </DropdownMenuItem>
                        </WithPermission>
                        <WithPermission hasPermission={hasPermission("common_delete_items")}>
                            <DropdownMenuItem
                                className="text-destructive"
                                onAction={() => setIsDeleteItemDialogOpen(true)}
                            >
                                <X className="h-4 w-4" /> {t("buttons.delete_item")}
                            </DropdownMenuItem>
                        </WithPermission>
                    </DropdownMenu>
                </DropdownMenuPopover>
            </DropDownMenuTrigger>
            <DialogContent
                isOpen={isDeleteItemDialogOpen}
                onOpenChange={setIsDeleteItemDialogOpen}
                size="small"
            >
                <DialogHeading>{t("dialogs.delete_item.title")}</DialogHeading>
                <DialogBody>{t("dialogs.delete_item.description")}</DialogBody>
                <DialogFooter>
                    <Button onPress={() => setIsDeleteItemDialogOpen(false)} variant="secondary">
                        {t("buttons.cancel")}
                    </Button>
                    <Button
                        isPending={deleteItemFetcher.state !== "idle"}
                        onPress={handleDeleteItem}
                        variant="destructive"
                    >
                        {t("buttons.delete_item")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    )
}
```

## Table Component

```typescript
import { Skeleton } from "@alianza/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableEmptyCell,
    TableHeader,
    TableRow,
} from "@alianza/ui/table"
import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Await, useRouteLoaderData } from "react-router"
import { IsActiveChip } from "~/components/is-active-chip"
import { ItemsTableRowButton } from "./items-table-row-button"
import type { loader } from "./route"

export function ItemsTable() {
    const { t } = useTranslation()
    const loaderData = useRouteLoaderData<typeof loader>("routes/_app.items")

    return (
        <Suspense fallback={<ItemsTableSkeleton />}>
            <Await resolve={loaderData?.items}>
                {(items) => (
                    <Table
                        aria-label={t("aria_labels.items_table")}
                        key={items?.data.map((item) => item.id).join("-")}
                    >
                        <TableHeader>
                            <TableColumn isRowHeader minWidth={130}>
                                {t("tables.headers.name")}
                            </TableColumn>
                            <TableColumn className="text-center" width={130}>
                                {t("tables.headers.status")}
                            </TableColumn>
                            <TableColumn width={80}>
                                <span className="sr-only">{t("tables.headers.actions")}</span>
                            </TableColumn>
                        </TableHeader>
                        <TableBody
                            items={items?.data}
                            renderEmptyState={() => <ItemsTableEmptyState />}
                        >
                            {(item) => (
                                <TableRow>
                                    <TableCell>
                                        {item.name}
                                        <p className="text-xs truncate">
                                            {item.description || "N/A"}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <IsActiveChip isActive={item.isActive} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ItemsTableRowButton item={item} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </Await>
        </Suspense>
    )
}
```

## Key Rules

1. **Use `DialogContent` with `isOpen onOpenChange`** for modals
2. **Use `useRouteLoaderData`** with full route path string
3. **Use `useFetcher<typeof action>()`** for form submissions
4. **Use `objectToFormData()`** before submitting
5. **Use `Link` for cancel** (not Button)
6. **Add `isPending={fetcher.state !== "idle"}`** to submit buttons
7. **Use `useModal()` hook** for dialog state management
8. **Wrap with `WithPermission`** for permission-based rendering
