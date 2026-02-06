import { Textarea } from '@alianza/ui/components/ui/textarea'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const TextareaFields = ({ name, label, placeholder, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => <Textarea {...register(name)} placeholder={placeholder} readOnly={readOnly} rows={6} />}
        </BaseFields>
    )
}

TextareaFields.displayName = 'TextareaFields'

export { TextareaFields }
