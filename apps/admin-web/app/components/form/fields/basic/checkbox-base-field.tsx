import { Checkbox } from '@alianza/ui/checkbox'
import { cn } from '@alianza/ui/utils/cn'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
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
    const { setValue, watch } = useFormContext<TFieldValues>()
    const value = watch(name)

    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => (
                <div className={cn('mt-2 flex flex-col space-x-4', inline && 'flex-row')}>
                    <input
                        type='hidden'
                        {...register(name)}
                        value={value ?? ''}
                        onChange={e => setValue(name, e.target.value as PathValue<TFieldValues, TName>)}
                    />
                    {options.map(option => (
                        <Checkbox
                            checked={value === option.value}
                            disabled={readOnly}
                            key={option.value}
                            onCheckedChange={isSelected =>
                                setValue(name, (isSelected ? option.value : undefined) as PathValue<TFieldValues, TName>)
                            }
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
