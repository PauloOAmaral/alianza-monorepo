import { DatePicker } from '@alianza/ui/date-picker'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { BaseFieldsChildrenProps } from '../../base-field'
import { BaseFields } from '../../base-field'

const DatePickerField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    readOnly
}: BaseFieldsChildrenProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => <DatePicker disabled={readOnly} onSelect={field.onChange} required={required} selected={field.value} />}
        </BaseFields>
    )
}

DatePickerField.displayName = 'DatePickerField'

export { DatePickerField }
