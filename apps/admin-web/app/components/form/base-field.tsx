import { Field, FieldError, FieldLabel, FormItem } from '@alianza/ui/components/ui/field'
import { type FieldPath, type FieldValues, type UseFormRegister, useFormContext } from 'react-hook-form'

interface BaseFieldsProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName
    label?: React.ReactNode
    required?: boolean
    srOnlyValue?: string
    children: (props: { register: UseFormRegister<TFieldValues> }) => React.ReactNode
}

interface BaseFieldsChildrenProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName
    nameField?: TName
    label?: React.ReactNode
    placeholder?: string
    required?: boolean
    readOnly?: boolean
}

const BaseFields = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    name,
    label,
    required,
    children,
    srOnlyValue
}: BaseFieldsProps<TFieldValues, TName>) => {
    const { register } = useFormContext<TFieldValues>()

    return (
        <FormItem>
            {label ? (
                <FieldLabel className='font-semibold text-primary'>
                    {label}
                    {required && <span className='text-gray-500 text-xs'>*</span>}
                </FieldLabel>
            ) : (
                <FieldLabel className='sr-only'>{srOnlyValue ?? String(name)}</FieldLabel>
            )}
            <Field>{children({ register })}</Field>
            <FieldError />
        </FormItem>
    )
}

BaseFields.displayName = 'BaseFields'

export { BaseFields, type BaseFieldsChildrenProps }
