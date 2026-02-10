import { FieldLabel, FormItem } from '@alianza/ui/components/ui/field'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { BaseSelect, type BaseSelectItem } from './base-select'

export interface BaseSelectFieldProps<TFieldValues extends FieldValues, TItem extends BaseSelectItem> {
    name: FieldPath<TFieldValues>
    label?: React.ReactNode
    required?: boolean
    srOnlyLabel?: string
    items: readonly TItem[]
    placeholder?: string
    disabled?: boolean
    getItemValue?: (item: TItem) => string
    onNameChange?: (name: TItem['name']) => void
    children?: (item: TItem) => React.ReactNode
    className?: string
    triggerClassName?: string
}

function BaseSelectFieldInner<TFieldValues extends FieldValues, TItem extends BaseSelectItem>({
    name,
    label,
    required,
    srOnlyLabel,
    items,
    placeholder,
    disabled,
    getItemValue,
    onNameChange,
    children,
    className,
    triggerClassName
}: BaseSelectFieldProps<TFieldValues, TItem>) {
    const { watch, setValue, formState, getFieldState } = useFormContext<TFieldValues>()
    const value = watch(name)
    const { error } = getFieldState(name, formState)

    return (
        <FormItem>
            {label != null ? (
                <FieldLabel className='font-semibold text-primary flex justify-between gap-1'>
                    {label}
                    {required && <span className='text-gray-500 text-xs'>*</span>}
                </FieldLabel>
            ) : (
                <FieldLabel className='sr-only'>{srOnlyLabel ?? String(name)}</FieldLabel>
            )}
            <BaseSelect<TItem>
                className={className}
                disabled={disabled}
                getItemValue={getItemValue}
                items={items}
                onNameChange={onNameChange}
                onValueChange={v => setValue(name, v as PathValue<TFieldValues, FieldPath<TFieldValues>>, { shouldValidate: true })}
                placeholder={placeholder ?? ''}
                triggerClassName={triggerClassName}
                value={value == null ? '' : String(value)}
            >
                {children}
            </BaseSelect>
            {error?.message != null && <p className='text-xs text-destructive'>{String(error.message)}</p>}
        </FormItem>
    )
}

export function BaseSelectField<TFieldValues extends FieldValues, TItem extends BaseSelectItem>(props: BaseSelectFieldProps<TFieldValues, TItem>) {
    return <BaseSelectFieldInner {...props} />
}
