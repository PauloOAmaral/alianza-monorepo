import { Field, FieldError, FieldLabel, FormField, FormItem } from "@alianza/ui/components/ui/field"
import {
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    useFormContext,
} from "react-hook-form"
import { useTranslation } from "react-i18next"

interface BaseFieldsProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName
    label?: React.ReactNode
    required?: boolean
    srOnlyValue?: string
    children: (props: {
        field: ControllerRenderProps<TFieldValues, TName>
        placeholder?: string
    }) => React.ReactNode
}

interface BaseFieldsChildrenProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName
    nameField?: TName
    label?: React.ReactNode
    placeholder?: string
    required?: boolean
    readOnly?: boolean
}

const BaseFields = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    label,
    required,
    children,
    srOnlyValue,
}: BaseFieldsProps<TFieldValues, TName>) => {
    const { control } = useFormContext<TFieldValues>()
    const { t } = useTranslation()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label ? (
                        <FieldLabel className="font-semibold text-primary flex justify-between gap-1">
                            {label}
                            {required && (
                                <span className="text-gray-500 text-xs">
                                    {t("fields.required")}*
                                </span>
                            )}
                        </FieldLabel>
                    ) : (
                        <FieldLabel className="sr-only">{srOnlyValue ?? String(name)}</FieldLabel>
                    )}
                    <Field>{children({ field })}</Field>
                    <FieldError />
                </FormItem>
            )}
        />
    )
}

BaseFields.displayName = "BaseFields"

export { BaseFields, type BaseFieldsChildrenProps }
