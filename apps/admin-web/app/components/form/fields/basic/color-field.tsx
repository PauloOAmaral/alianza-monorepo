import { Input } from '@alianza/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

const ColorField = ({ name, label, placeholder, required }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    const { setValue, watch } = useFormContext<FieldValues>()
    const value = watch(name) ?? ''

    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => (
                <div className='flex items-center gap-2'>
                    <Input {...register(name)} className='h-10 w-20 rounded border border-input cursor-pointer' onChange={e => setValue(name, e.target.value)} type='color' value={value} />
                    <Input className='flex-1' maxLength={7} onChange={e => setValue(name, e.target.value)} placeholder={placeholder ?? '#000000'} value={value} />
                </div>
            )}
        </BaseFields>
    )
}

ColorField.displayName = 'ColorField'

export { ColorField }
