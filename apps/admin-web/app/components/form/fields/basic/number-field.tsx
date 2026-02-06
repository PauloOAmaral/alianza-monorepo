import { Input } from '@alianza/ui/input'
import { cn } from '@alianza/ui/utils/cn'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const NumberField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    placeholder,
    required,
    readOnly
}: BaseFieldsChildrenProps<TFieldValues, TName>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => <Input className={cn(readOnly && 'bg-gray-100 text-gray-600')} {...register(name)} placeholder={placeholder} readOnly={readOnly} type='number' />}
        </BaseFields>
    )
}

NumberField.displayName = 'NumberField'

export { NumberField }
