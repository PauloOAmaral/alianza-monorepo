import { Checkbox } from '@alianza/ui/checkbox'
import { cn } from '@alianza/ui/utils/cn'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

interface CheckboxOption {
    value: string
    label: string
}

interface CheckboxBaseFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    options: CheckboxOption[]
    inline?: boolean
}

const CheckboxBaseField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    options,
    readOnly,
    inline = false
}: CheckboxBaseFieldProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <div className={cn('mt-2 flex flex-col space-x-4', inline && 'flex-row')}>
                    {options.map(option => (
                        <Checkbox
                            checked={field.value === option.value}
                            disabled={readOnly}
                            key={option.value}
                            onChange={isSelected => {
                                field.onChange(isSelected ? option.value : undefined)
                            }}
                        >
                            {option.label}
                        </Checkbox>
                    ))}
                </div>
            )}
        </BaseFields>
    )
}

CheckboxBaseField.displayName = 'CheckboxBaseField'

export { CheckboxBaseField }
export type { CheckboxOption }
