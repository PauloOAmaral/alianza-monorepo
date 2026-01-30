import { Button } from "@alianza/ui/button"
import {
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
} from "@alianza/ui/form-control"
import { Input } from "@alianza/ui/input"
import { Item, Select } from "@alianza/ui/select"
import { countries } from "@alianza/utils/iso-countries"
import { useEffect } from "react"
import type { Control, FieldValues, Path } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { PlacesComboBox } from "~/components/shared/places-combo-box"

type AddressValue = {
    mode: "auto" | "manual"
    externalId: string
    addressLine1: string
    addressLine2: string
    suburb: string
    city: string
    state: string
    postalCode: string
    country: string
}

type AddressFieldProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>
    name?: Path<TFieldValues>
    defaultValue?: Partial<AddressValue>
    disabled?: boolean
}

export function AddressField<TFieldValues extends FieldValues>({
    control,
    name,
    defaultValue,
    disabled,
}: AddressFieldProps<TFieldValues>) {
    const { t } = useTranslation()
    const { setValue, resetField, watch } = useFormContext<TFieldValues>()

    const fieldPath = (child: keyof AddressValue) =>
        (name ? `${name}.${String(child)}` : String(child)) as Path<TFieldValues>

    const mode = watch(fieldPath("mode")) as "auto" | "manual"

    // Clear opposite set of fields when switching modes (do not reset to defaults)
    useEffect(() => {
        if (mode === "auto") {
            // reset auto fields
            resetField(fieldPath("externalId"))

            // clear manual fields
            setValue(fieldPath("addressLine1"), "" as any)
            setValue(fieldPath("addressLine2"), "" as any)
            setValue(fieldPath("suburb"), "" as any)
            setValue(fieldPath("city"), "" as any)
            setValue(fieldPath("state"), "" as any)
            setValue(fieldPath("postalCode"), "" as any)
            setValue(fieldPath("country"), "" as any)
        } else if (mode === "manual") {
            // clear auto fields
            setValue(fieldPath("externalId"), "" as any)

            // reset manual fields
            resetField(fieldPath("addressLine1"))
            resetField(fieldPath("addressLine2"))
            resetField(fieldPath("suburb"))
            resetField(fieldPath("city"))
            resetField(fieldPath("state"))
            resetField(fieldPath("postalCode"))
            resetField(fieldPath("country"))
        }
    }, [mode])

    const defaultItems = defaultValue?.externalId
        ? [
            {
                id: defaultValue.externalId,
                place: [
                    defaultValue.addressLine1,
                    defaultValue.suburb,
                    defaultValue.city,
                    defaultValue.state,
                    defaultValue.country,
                ]
                    .filter(Boolean)
                    .join(", "),
            },
        ]
        : undefined

    return (
        <div className="space-y-4">
            {mode === "auto" ? (
                <FormField
                    control={control}
                    name={fieldPath("externalId")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("fields.address.search.label")}</FormLabel>
                            <FormControl>
                                <PlacesComboBox
                                    {...field}
                                    defaultItems={defaultItems}
                                    defaultSelectedKey={defaultValue?.externalId ?? undefined}
                                    isDisabled={disabled}
                                    onSelectionChange={field.onChange}
                                />
                            </FormControl>
                            <FormError />
                            <span className="text-xs text-muted-foreground">
                                <Trans
                                    components={{
                                        button: (
                                            <Button
                                                className="text-xs"
                                                isDisabled={disabled}
                                                onPress={() =>
                                                    setValue(fieldPath("mode"), "manual" as any)
                                                }
                                                variant="link"
                                            />
                                        ),
                                    }}
                                    i18nKey="common.address_option_manual"
                                />
                            </span>
                        </FormItem>
                    )}
                />
            ) : (
                <div className="p-4 border border-border rounded-md space-y-4">
                    <span className="text-xs text-muted-foreground mb-4 block">
                        <Trans
                            components={{
                                button: (
                                    <Button
                                        className="text-xs"
                                        isDisabled={disabled}
                                        onPress={() => setValue(fieldPath("mode"), "auto" as any)}
                                        variant="link"
                                    />
                                ),
                            }}
                            i18nKey="common.address_option_auto"
                        />
                    </span>

                    <FormField
                        control={control}
                        name={fieldPath("addressLine1")}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("fields.address.addressLine1.label")}</FormLabel>
                                <FormControl>
                                    <Input disabled={disabled} {...field} />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={fieldPath("addressLine2")}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("fields.address.addressLine2.label")}</FormLabel>
                                <FormControl>
                                    <Input disabled={disabled} {...field} />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <FormField
                            control={control}
                            name={fieldPath("suburb")}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.address.suburb.label")}</FormLabel>
                                    <FormControl>
                                        <Input disabled={disabled} {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={fieldPath("city")}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.address.city.label")}</FormLabel>
                                    <FormControl>
                                        <Input disabled={disabled} {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={fieldPath("postalCode")}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.address.postalCode.label")}</FormLabel>
                                    <FormControl>
                                        <Input disabled={disabled} {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <FormField
                            control={control}
                            name={fieldPath("state")}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.address.state.label")}</FormLabel>
                                    <FormControl>
                                        <Input disabled={disabled} {...field} />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={fieldPath("country")}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("fields.address.country.label")}</FormLabel>
                                    <FormControl>
                                        <Select
                                            items={[
                                                {
                                                    code: "",
                                                    name: t("fields.address.selectCountry.label"),
                                                },
                                                ...countries,
                                            ]}
                                            {...field}
                                        >
                                            {(item) => (
                                                <Item id={item.code} textValue={item.name}>
                                                    {item.name}
                                                </Item>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
