import { Checkbox } from "@alianza/ui/checkbox"
import type { FieldPath, FieldValues } from "react-hook-form"
import { BaseFields, type BaseFieldsChildrenProps } from "../shared/base-fields"

interface CheckboxFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    checkboxLabel?: React.ReactNode
}

const CheckboxField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    label,
    required,
    readOnly,
    checkboxLabel,
}: CheckboxFieldProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <Checkbox
                    isDisabled={readOnly}
                    isSelected={field.value === true || field.value === "true"}
                    onChange={(isSelected) => {
                        field.onChange(isSelected ? "true" : "false")
                    }}
                >
                    {checkboxLabel || label}
                </Checkbox>
            )}
        </BaseFields>
    )
}

CheckboxField.displayName = "CheckboxField"

export { CheckboxField }
export type { CheckboxFieldProps }
