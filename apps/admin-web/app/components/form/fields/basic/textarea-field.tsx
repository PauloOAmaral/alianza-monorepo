import { Textarea } from '@alianza/ui/textarea'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../shared/base-fields'

const TextareaFields = ({ name, label, placeholder, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => <Textarea {...field} placeholder={placeholder} readOnly={readOnly} rows={6} />}
        </BaseFields>
    )
}

TextareaFields.displayName = 'TextareaFields'

export { TextareaFields }
