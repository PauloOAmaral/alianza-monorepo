import { Input } from '@alianza/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../shared/base-fields'

const PhoneField = ({ name, label, placeholder, required }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => <Input {...field} placeholder={placeholder} type='tel' />}
        </BaseFields>
    )
}

PhoneField.displayName = 'PhoneField'

export { PhoneField }
