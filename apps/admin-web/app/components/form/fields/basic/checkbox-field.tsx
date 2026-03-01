import { Checkbox } from '@alianza/ui/components/ui/checkbox'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

interface CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    checkboxLabel?: React.ReactNode
}

const CheckboxField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    readOnly,
    checkboxLabel
}: CheckboxFieldProps<TFieldValues, TName>) => {
    const { setValue, watch } = useFormContext<TFieldValues>()
    const value = watch(name)
    const checked = value === true || value === 'true'

    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => (
                <Checkbox {...register(name)} checked={checked} disabled={readOnly} onCheckedChange={isSelected => setValue(name, (isSelected ? 'true' : 'false') as TFieldValues[TName])}>
                    {checkboxLabel ?? label}
                </Checkbox>
            )}
        </BaseFields>
    )
}

CheckboxField.displayName = 'CheckboxField'

export { CheckboxField }
export type { CheckboxFieldProps }
