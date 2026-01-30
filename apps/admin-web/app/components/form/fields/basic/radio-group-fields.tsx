import { RadioGroup } from '@alianza/ui/radio-group'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields } from '../shared'
import type { BaseFieldsChildrenProps } from '../shared/base-fields'

interface RadioGroupFieldsProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    orientation?: 'horizontal' | 'vertical'
    children: React.ReactNode
}

const RadioGroupFields = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    orientation,
    children
}: RadioGroupFieldsProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <RadioGroup orientation={orientation} {...field}>
                    {children}
                </RadioGroup>
            )}
        </BaseFields>
    )
}

RadioGroupFields.displayName = 'RadioGroupFields'

export default RadioGroupFields
export { RadioGroupFields }
