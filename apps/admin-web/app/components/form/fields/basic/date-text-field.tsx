import { Input } from '@alianza/ui/input'
import { format } from 'date-fns'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const DateTextField = ({ name, label, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => {
                const formattedValue = field.value ? format(new Date(field.value), 'dd/MM/yyyy') : ''

                return <Input readOnly={readOnly} type='text' value={formattedValue} />
            }}
        </BaseFields>
    )
}

DateTextField.displayName = 'DateTextField'

export { DateTextField }
