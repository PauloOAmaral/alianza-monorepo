import {
    Accordion,
    AccordionContent,
    AccordionHeading,
    AccordionItem,
} from "@alianza/ui/accordion"
import { Alert } from "@alianza/ui/alert"
import { Chip } from "@alianza/ui/chip"
import { FormControl, FormField, FormItem, FormLabel } from "@alianza/ui/form-control"
import { Switch } from "@alianza/ui/switch"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { getPermissionCategories, type Permission } from "~/utils/permissions"

interface PermissionCategoriesFieldProps {
    name: string
}

export function PermissionCategoriesField({ name }: PermissionCategoriesFieldProps) {
    const { t } = useTranslation()

    const { control, watch, formState, setValue } = useFormContext()

    const permissions = watch(name) as string[]

    const fullPermissionSelected = permissions.includes("full")
    const permissionsError = formState.errors[name]

    function getSelectedPermissionsCount(categoryPermissions: Permission[]) {
        if (!categoryPermissions || categoryPermissions.length === 0) {
            return "0/0"
        }

        if (fullPermissionSelected) {
            return `${categoryPermissions.length}/${categoryPermissions.length}`
        }

        const selectedCount = categoryPermissions.filter((permission) =>
            permissions.includes(permission.name),
        ).length

        return `${selectedCount}/${categoryPermissions.length}`
    }

    function handlePermissionChange(permissionName: string, value: boolean) {
        if (value) {
            setValue(name, [...permissions, permissionName], { shouldValidate: true })
        } else {
            setValue(
                name,
                permissions.filter((p) => p !== permissionName),
                { shouldValidate: true },
            )
        }
    }

    return (
        <div className="space-y-4">
            <FormField
                control={control}
                name={name}
                render={() => (
                    <FormItem className="flex w-full gap-2 min-w-0 flex-row p-2">
                        <div className="flex-1">
                            <FormLabel>{t("fields.permissions.permissionFull")}</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                {t("permissions.permissionFullDescription")}
                            </p>
                        </div>
                        <FormControl>
                            <Switch
                                aria-describedby="permissions-error"
                                isSelected={fullPermissionSelected}
                                onChange={(value) => handlePermissionChange("full", value)}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <Accordion>
                {getPermissionCategories()
                    .filter((category) => category.id !== "admin")
                    .map((category) => (
                        <AccordionItem id={category.id} key={category.id}>
                            <AccordionHeading>
                                <h3>{category.label}</h3>
                                <Chip className="ml-auto" variant="gray">
                                    {getSelectedPermissionsCount(category.permissions)}
                                </Chip>
                            </AccordionHeading>
                            <AccordionContent className="flex flex-col gap-4">
                                {category.permissions.map((permission) => (
                                    <FormField
                                        control={control}
                                        key={permission.name}
                                        name={name}
                                        render={() => (
                                            <FormItem className="flex flex-row items-center justify-between">
                                                <div className="flex-1">
                                                    <FormLabel>{permission.label}</FormLabel>
                                                    <p className="text-sm text-muted-foreground">
                                                        {permission.description}
                                                    </p>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        aria-describedby="permissions-error"
                                                        isDisabled={fullPermissionSelected}
                                                        isSelected={
                                                            fullPermissionSelected ||
                                                            permissions.includes(permission.name)
                                                        }
                                                        onChange={(value) =>
                                                            handlePermissionChange(
                                                                permission.name,
                                                                value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
            </Accordion>

            {permissionsError ? (
                <Alert id="permissions-error" size="small" variant="negative">
                    {permissionsError.message as string}
                </Alert>
            ) : null}
        </div>
    )
}
