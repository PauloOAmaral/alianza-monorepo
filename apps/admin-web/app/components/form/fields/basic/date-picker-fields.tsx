import { DatePicker } from '@alianza/ui/date-picker'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { BaseFieldsChildrenProps } from '../shared/base-fields'
import { BaseFields } from '../shared/base-fields'

const DatePickerField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    readOnly
}: BaseFieldsChildrenProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => <DatePicker isDisabled={readOnly} {...field} />}
        </BaseFields>
    )
}

DatePickerField.displayName = 'DatePickerField'

export { DatePickerField }
