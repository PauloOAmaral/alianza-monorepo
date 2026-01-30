import { Switch } from "@alianza/ui/switch"
import type { FieldPath, FieldValues } from "react-hook-form"
import { BaseFields, type BaseFieldsChildrenProps } from "../shared/base-fields"

const SwitchField = ({
    name,
    label,
    required,
}: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <Switch
                    isSelected={field.value === "true" || field.value === true}
                    onChange={(isSelected) => field.onChange(isSelected ? "true" : "false")}
                />
            )}
        </BaseFields>
    )
}

SwitchField.displayName = "SwitchField"

export { SwitchField }
