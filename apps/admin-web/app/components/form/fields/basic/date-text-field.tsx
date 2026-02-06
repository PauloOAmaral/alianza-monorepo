import { Input } from '@alianza/ui/input'
import { format, isValid } from 'date-fns'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

function toFormattedDate(value: unknown): string {
    if (value == null) return ''
    if (value instanceof Date) return isValid(value) ? format(value, 'dd/MM/yyyy') : ''
    const s = String(value)
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s
    const d = new Date(s)
    return isValid(d) ? format(d, 'dd/MM/yyyy') : s
}

const DateTextField = ({ name, label, required, readOnly }: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) => {
    const { setValue, watch } = useFormContext<FieldValues>()
    const value = watch(name)
    const formattedValue = toFormattedDate(value)

    return (
        <BaseFields label={label} name={name} required={required}>
            {({ register }) => (
                <Input
                    {...register(name)}
                    readOnly={readOnly}
                    type='text'
                    value={formattedValue}
                    onChange={e => setValue(name, e.target.value)}
                />
            )}
        </BaseFields>
    )
}

DateTextField.displayName = 'DateTextField'

export { DateTextField }
