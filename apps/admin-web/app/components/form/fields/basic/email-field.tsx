import { Input } from '@alianza/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const EmailField = ({ name, label, placeholder, required }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => <Input {...register(name)} placeholder={placeholder} type='email' />}
        </BaseFields>
    )
}

EmailField.displayName = 'EmailField'

export { EmailField }
