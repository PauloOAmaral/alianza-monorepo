import { DatePicker } from '@alianza/ui/components/ui/date-picker'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'
import { useFormContext } from 'react-hook-form'

const DateField = ({ name, label, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    const { setValue, watch } = useFormContext<FieldValues>()
    const value = watch(name)
    const selected =
        value != null && typeof value === 'object' && value instanceof Date
            ? value
            : value != null
              ? new Date(value as string)
              : undefined

    return (
        <BaseFields label={label} name={name} required={required}>
            {() => (
                <DatePicker
                    disabled={readOnly}
                    onSelect={date => setValue(name, date)}
                    required={required}
                    selected={selected}
                />
            )}
        </BaseFields>
    )
}

DateField.displayName = 'DateField'

export { DateField }
