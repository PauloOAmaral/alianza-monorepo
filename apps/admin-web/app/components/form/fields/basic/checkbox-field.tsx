import { Checkbox } from '@alianza/ui/components/ui/checkbox'
import type { FieldPath, FieldValues } from 'react-hook-form'
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
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <Checkbox
                    checked={field.value === true || field.value === 'true'}
                    disabled={readOnly}
                    onChange={isSelected => {
                        field.onChange(isSelected ? 'true' : 'false')
                    }}
                >
                    {checkboxLabel || label}
                </Checkbox>
            )}
        </BaseFields>
    )
}

CheckboxField.displayName = 'CheckboxField'

export { CheckboxField }
export type { CheckboxFieldProps }
