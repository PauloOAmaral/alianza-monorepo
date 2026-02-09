import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@alianza/ui/components/ui/select'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

type SelectOption = {
    value: string
    label: string
}

type SelectFieldProps = BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>> & {
    options: SelectOption[]
    placeholder?: string
}

const SelectField = ({ name, label, placeholder, required, options }: SelectFieldProps) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </BaseFields>
    )
}

SelectField.displayName = 'SelectField'

export { SelectField }
