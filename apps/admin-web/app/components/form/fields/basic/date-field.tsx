import { DatePicker } from '@alianza/ui/components/ui/date-picker'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const DateField = ({ name, label, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => {
                return <DatePicker disabled={readOnly} onSelect={field.onChange} required={required} selected={field.value} />
            }}
        </BaseFields>
    )
}

DateField.displayName = 'DateField'

export { DateField }
