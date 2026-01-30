import { FormControl, FormField, FormItem, FormLabel } from '@alianza/ui/form-control'
import { Item, Select } from '@alianza/ui/select'
import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'

interface SelectOption {
    id: string
    name: string
}

interface ExcelSelectFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>
    items: SelectOption[]
    className?: string
    onSelectionChange?: (val: string | number | null) => void
    renderItem?: (item: SelectOption) => React.ReactNode
}

function ExcelSelectField<TFieldValues extends FieldValues = FieldValues>({ name, items, className, onSelectionChange, renderItem }: ExcelSelectFieldProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='sr-only'>{String(name)}</FormLabel>
                    <FormControl>
                        <Select
                            buttonClassName={'border-0 shadow-none h-full focus-visible:ring-0 focus:outline-0 focus:border-0 w-full rounded-none text-xs'}
                            className={className || 'border-0 shadow-none h-full focus-visible:ring-0 focus:outline-0 focus:border-0 w-full rounded-none text-xs'}
                            items={items}
                            onChange={val => {
                                field.onChange(val ?? '')
                                onSelectionChange?.(val)
                            }}
                            placeholder=''
                            selectedKey={field.value}
                        >
                            {item => (
                                <Item id={item.id} key={item.id} textValue={item.name}>
                                    {renderItem ? renderItem(item) : item.name}
                                </Item>
                            )}
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

ExcelSelectField.displayName = 'ExcelSelectField'

export { ExcelSelectField }

export type { ExcelSelectFieldProps, SelectOption }
