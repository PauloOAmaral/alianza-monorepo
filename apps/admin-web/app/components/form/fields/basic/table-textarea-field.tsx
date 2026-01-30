import { Field, FieldError, FormField, FormItem } from '@alianza/ui/components/ui/field'
import { Textarea } from '@alianza/ui/textarea'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

interface TableTextareaFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>
    className?: string
    control: Control<TFieldValues>
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void
    style?: React.CSSProperties
}

const TableTextareaField = <TFieldValues extends FieldValues = FieldValues>({ name, className, control, onFocus, onInput, style }: TableTextareaFieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='m-0 gap-0'>
                    <Field>
                        <Textarea {...field} className={className} onFocus={onFocus} onInput={onInput} rows={1} style={style} />
                    </Field>
                    <FieldError />
                </FormItem>
            )}
        />
    )
}

TableTextareaField.displayName = 'TableTextareaField'

export { TableTextareaField }
export type { TableTextareaFieldProps }
