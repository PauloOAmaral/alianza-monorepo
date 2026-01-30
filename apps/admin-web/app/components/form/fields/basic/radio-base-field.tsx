import { Radio, RadioGroup } from "@alianza/ui/radio-group"
import { cn } from "@alianza/ui/utils"
import type { FieldPath, FieldValues, PathValue } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { BaseFields, type BaseFieldsChildrenProps } from "../shared/base-fields"

interface RadioOption {
    value: string
    label: string
}

interface RadioBaseFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    options: RadioOption[]
    inline?: boolean
}

const RadioBaseField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    nameField,
    label,
    required,
    options,
    readOnly,
    inline = false,
}: RadioBaseFieldProps<TFieldValues, TName>) => {
    const form = useFormContext<TFieldValues>()

    function handleChange(value: string) {
        if (nameField) {
            const selectedOption = options.find((option) => option.value === value)

            if (selectedOption) {
                form.setValue(nameField, selectedOption.label as PathValue<TFieldValues, TName>)
            }
        }
    }

    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <RadioGroup
                    className={cn("mt-2", inline && "flex flex-row space-x-4 space-y-0")}
                    isDisabled={readOnly}
                    name={name}
                    onChange={(value) => {
                        field.onChange(value)
                        handleChange(value)
                    }}
                    value={field.value || ""}
                >
                    {options.map((option) => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </RadioGroup>
            )}
        </BaseFields>
    )
}

RadioBaseField.displayName = "RadioBaseField"

export { RadioBaseField }
export type { RadioOption }
