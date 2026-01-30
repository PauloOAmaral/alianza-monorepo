import { FormControl, FormField, FormItem, FormMessage } from '@alianza/ui/form-control'
import { Input } from '@alianza/ui/input'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

interface TableTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>
    className?: string
    disabled?: boolean
    control: Control<TFieldValues>
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    style?: React.CSSProperties
}

const TableTextField = <TFieldValues extends FieldValues = FieldValues>({ name, className, disabled, control, onFocus, style }: TableTextFieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='m-0 gap-0'>
                    <FormControl>
                        <Input {...field} className={className} disabled={disabled} onFocus={onFocus} style={style} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

TableTextField.displayName = 'TableTextField'

export { TableTextField }
export type { TableTextFieldProps }
