import { Input } from "@alianza/ui/components/ui/input"
import type { FieldPath, FieldValues } from "react-hook-form"
import { BaseFields, type BaseFieldsChildrenProps } from "../../base-field"

const TextField = ({
    name,
    label,
    placeholder,
    required,
    readOnly,
}: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <Input {...field} placeholder={placeholder} readOnly={readOnly} type="text" />
            )}
        </BaseFields>
    )
}

TextField.displayName = "TextField"

export { TextField }
