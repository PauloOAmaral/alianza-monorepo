import { DatePicker } from '@alianza/ui/date-picker'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../shared/base-fields'

const DateField = ({ name, label, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => {
                return <DatePicker isDisabled={readOnly} onChange={field.onChange} value={field.value} />
            }}
        </BaseFields>
    )
}

DateField.displayName = 'DateField'

export { DateField }
