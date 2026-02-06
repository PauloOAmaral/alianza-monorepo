import { Label } from '@alianza/ui/label'
import { RadioGroup, RadioGroupItem } from '@alianza/ui/radio-group'
import { cn } from '@alianza/ui/utils/cn'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

interface RadioOption {
    value: string
    label: string
}

interface RadioBaseFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends BaseFieldsChildrenProps<TFieldValues, TName> {
    options: RadioOption[]
    inline?: boolean
}

const RadioBaseField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    nameField,
    label,
    required,
    options,
    readOnly,
    inline = false
}: RadioBaseFieldProps<TFieldValues, TName>) => {
    const form = useFormContext<TFieldValues>()
    const value = form.watch(name)

    function handleValueChange(value: string) {
        form.setValue(name, value as PathValue<TFieldValues, TName>)

        if (nameField) {
            const selectedOption = options.find(option => option.value === value)

            if (selectedOption) {
                form.setValue(nameField, selectedOption.label as PathValue<TFieldValues, TName>)
            }
        }
    }

    return (
        <BaseFields label={label} name={name} required={required}>
            {() => (
                <RadioGroup className={cn('mt-2', inline && 'flex flex-row flex-wrap gap-3 gap-x-4')} disabled={readOnly} onValueChange={handleValueChange} value={value ?? ''}>
                    {options.map(option => (
                        <div className='flex items-center space-x-2' key={option.value}>
                            <RadioGroupItem id={`${String(name)}-${option.value}`} value={option.value} />
                            <Label className='cursor-pointer font-normal' htmlFor={`${String(name)}-${option.value}`}>
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </BaseFields>
    )
}

RadioBaseField.displayName = 'RadioBaseField'

export { RadioBaseField }
export type { RadioOption }
