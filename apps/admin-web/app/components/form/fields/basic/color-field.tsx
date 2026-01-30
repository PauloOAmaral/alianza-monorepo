import { Input } from '@alianza/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../shared/base-fields'

const ColorField = ({ name, label, placeholder, required }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    return (
        <BaseFields label={label} name={name} required={required}>
            {({ field }) => (
                <div className='flex items-center gap-2'>
                    <Input className='h-10 w-20 rounded border border-input cursor-pointer' onChange={e => field.onChange(e.target.value)} type='color' value={field.value} />

                    <Input className='flex-1' maxLength={7} onChange={e => field.onChange(e.target.value)} placeholder={placeholder || '#000000'} value={field.value} />
                </div>
            )}
        </BaseFields>
    )
}

ColorField.displayName = 'ColorField'

export { ColorField }
