import { Input } from "@alianza/ui/input"
import { cn } from "@alianza/ui/utils"
import { format } from "date-fns"
import type { FieldPath, FieldValues } from "react-hook-form"
import { BaseFields, type BaseFieldsChildrenProps } from "../shared/base-fields"

const DateTextField = ({
    name,
    label,
    required,
    readOnly = true,
}: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => {
                const formattedValue = field.value
                    ? format(new Date(field.value), "dd/MM/yyyy")
                    : ""

                return <Input readOnly={readOnly} type="text" value={formattedValue} />
            }}
        </BaseFields>
    )
}

DateTextField.displayName = "DateTextField"

export { DateTextField }
