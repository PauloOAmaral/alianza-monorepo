import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@alianza/ui/components/ui/select'
import { cn } from '@alianza/ui/utils/cn'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface BaseSelectItem {
    id: string
    name?: string
    readonly?: boolean
    isActive?: boolean
    translateKey?: string
}

export interface BaseSelectProps<TItem extends BaseSelectItem> {
    items: readonly TItem[]
    value?: string
    placeholder?: string
    disabled?: boolean
    getItemValue?: (item: TItem) => string
    onValueChange: (value: string) => void
    onNameChange?: (name: TItem['name']) => void
    children?: (item: TItem) => React.ReactNode
    className?: string
    triggerClassName?: string
}

function BaseSelectInner<TItem extends BaseSelectItem>({
    items,
    value,
    placeholder,
    disabled,
    getItemValue = item => String(item.id),
    onValueChange,
    onNameChange,
    children,
    className,
    triggerClassName
}: BaseSelectProps<TItem>) {
    const { t } = useTranslation()
    const lastProcessedKeyRef = useRef<string | undefined>(undefined)

    useEffect(() => {
        if (onNameChange && value && items.length > 0) {
            if (lastProcessedKeyRef.current !== value) {
                const selectedItem = items.find(item => getItemValue(item) === value)

                if (selectedItem && selectedItem.name != null) {
                    lastProcessedKeyRef.current = value
                    onNameChange(selectedItem.name)
                }
            }
        }
    }, [onNameChange, value, items, getItemValue])

    function handleChange(val: string) {
        onValueChange(val)

        if (onNameChange && val) {
            const selectedItem = items.find(item => getItemValue(item) === val)

            if (selectedItem && selectedItem.name != null) {
                lastProcessedKeyRef.current = val
                onNameChange(selectedItem.name)
            }
        } else {
            lastProcessedKeyRef.current = undefined
        }
    }

    return (
        <Select disabled={disabled} onValueChange={handleChange} value={value ?? ''}>
            <SelectTrigger className={cn('w-full', disabled && 'bg-muted cursor-not-allowed opacity-70', triggerClassName)}>
                <SelectValue placeholder={placeholder ?? ''} />
            </SelectTrigger>
            <SelectContent className={className}>
                {items.map(item => {
                    const itemValue = getItemValue(item)
                    const isDisabled = item.readonly || item.isActive === false
                    const label: React.ReactNode =
                        item.translateKey != null
                            ? t(item.translateKey as never)
                            : children != null
                                ? children(item)
                                : item.name ?? item.id

                    return (
                        <SelectItem disabled={isDisabled} key={item.id} value={itemValue}>
                            {label}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}

export function BaseSelect<TItem extends BaseSelectItem>(props: BaseSelectProps<TItem>) {
    return <BaseSelectInner {...props} />
}
