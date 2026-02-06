import { DatePicker } from '@alianza/ui/date-picker'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import type { BaseFieldsChildrenProps } from '../../base-field'
import { BaseFields } from '../../base-field'

const DatePickerField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    readOnly
}: BaseFieldsChildrenProps<TFieldValues, TName>) => {
    const { setValue, watch } = useFormContext<TFieldValues>()
    const value = watch(name)
    const selected =
        value != null && typeof value === 'object' && (value as unknown) instanceof Date
            ? (value as Date)
            : value != null
              ? new Date(value as string)
              : undefined

    return (
        <BaseFields label={label} name={name} required={required}>
            {() => (
                <DatePicker
                    disabled={readOnly}
                    onSelect={date => setValue(name, date as PathValue<TFieldValues, TName>)}
                    required={required}
                    selected={selected}
                />
            )}
        </BaseFields>
    )
}

DatePickerField.displayName = 'DatePickerField'

export { DatePickerField }
