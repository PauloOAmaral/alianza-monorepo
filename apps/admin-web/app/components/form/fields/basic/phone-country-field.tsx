import { FieldLabel, FormItem } from '@alianza/ui/components/ui/field'
import { alpha2ToFlag } from '@alianza/utils/common'
import { useFormContext } from 'react-hook-form'
import { BaseSelectField } from '~/components/shared/base-select-field'
import { PhoneField } from './phone-field'

type PhoneCountryOption = {
    id: string
    name: string
    phoneCountryCode?: string | null
    countryAlpha2Code?: string | null
}

type PhoneCountryFieldProps = {
    label: string
    numberName: string
    countryCodeName: string
    required?: boolean
    items: PhoneCountryOption[]
    className?: string
}

export function PhoneCountryField({ label, numberName, countryCodeName, required, items, className }: PhoneCountryFieldProps) {
    const { formState, getFieldState } = useFormContext()

    const countryError = getFieldState(countryCodeName, formState).error?.message
    const numberError = getFieldState(numberName, formState).error?.message

    return (
        <FormItem className={className}>
            <FieldLabel className='font-semibold text-primary flex justify-between gap-1'>
                {label}
                {required && <span className='text-gray-500 text-xs'>*</span>}
            </FieldLabel>
            <div className='grid gap-2 sm:grid-cols-[220px_1fr]'>
                <BaseSelectField items={items} name={countryCodeName} required>
                    {option => (
                        <>
                            <span className='mr-2'>{alpha2ToFlag(option.countryAlpha2Code)}</span>
                            <span className='truncate'>{option.name}</span>
                            <span className='ml-auto text-muted-foreground'>+{option.phoneCountryCode}</span>
                        </>
                    )}
                </BaseSelectField>
                <PhoneField label={label} name={numberName} required />
            </div>

            {(countryError != null || numberError != null) && (
                <div className='grid gap-1 sm:grid-cols-[220px_1fr]'>
                    <p className='text-xs text-destructive'>{countryError != null ? String(countryError) : ''}</p>
                    <p className='text-xs text-destructive'>{numberError != null ? String(numberError) : ''}</p>
                </div>
            )}
        </FormItem>
    )
}
