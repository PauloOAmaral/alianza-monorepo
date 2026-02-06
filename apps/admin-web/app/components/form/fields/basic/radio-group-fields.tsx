import { RadioGroup } from '@alianza/ui/components/ui/radio-group'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

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
            {({ register }) => (
                <RadioGroup orientation={orientation} {...register(name)}>
                    {children}
                </RadioGroup>
            )}
        </BaseFields>
    )
}

RadioGroupFields.displayName = 'RadioGroupFields'

export default RadioGroupFields
export { RadioGroupFields }
