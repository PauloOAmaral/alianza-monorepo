import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@alianza/ui/components/ui/select'
import { Field, FieldLabel, FormField, FormItem } from '@alianza/ui/components/ui/field'
import { Input } from '@alianza/ui/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { cn } from '@alianza/ui/utils/cn'

type PhoneCountryOption = {
    id: string
    name: string
    phoneCountryCode: string
    countryAlpha2Code?: string | null
}

type PhoneCountryFieldProps = {
    label: string
    numberName: string
    countryCodeName: string
    placeholderNumber?: string
    placeholderCountry?: string
    required?: boolean
    options: PhoneCountryOption[]
    className?: string
}

function alpha2ToFlag(alpha2?: string | null) {
    if (!alpha2 || alpha2.length !== 2) return '🏳️'
    const code = alpha2.toUpperCase()
    return code.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

export function PhoneCountryField({
    label,
    numberName,
    countryCodeName,
    placeholderNumber,
    placeholderCountry,
    required,
    options,
    className
}: PhoneCountryFieldProps) {
    const { control, formState } = useFormContext()
    const countryError = (formState.errors as any)?.[countryCodeName]?.message
    const numberError = (formState.errors as any)?.[numberName]?.message

    return (
        <FormItem className={className}>
            <FieldLabel className='font-semibold text-primary flex justify-between gap-1'>
                {label}
                {required && <span className='text-gray-500 text-xs'>*</span>}
            </FieldLabel>
            <div className='grid gap-2 sm:grid-cols-[220px_1fr]'>
                <FormField
                    control={control}
                    name={countryCodeName}
                    render={({ field }) => (
                        <Field>
                            <Select onValueChange={field.onChange} value={field.value == null ? '' : String(field.value)}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder={placeholderCountry} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map(option => (
                                        <SelectItem key={option.id} value={option.phoneCountryCode}>
                                            <span className='mr-2'>{alpha2ToFlag(option.countryAlpha2Code)}</span>
                                            <span className='truncate'>{option.name}</span>
                                            <span className='ml-auto text-muted-foreground'>+{option.phoneCountryCode}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <FormField
                    control={control}
                    name={numberName}
                    render={({ field }) => (
                        <Field>
                            <Input
                                {...field}
                                className={cn('w-full')}
                                inputMode='tel'
                                placeholder={placeholderNumber}
                                type='tel'
                            />
                        </Field>
                    )}
                />
            </div>
            {(countryError || numberError) && (
                <div className='grid gap-1 sm:grid-cols-[220px_1fr]'>
                    <p className='text-xs text-destructive'>{countryError ? String(countryError) : ''}</p>
                    <p className='text-xs text-destructive'>{numberError ? String(numberError) : ''}</p>
                </div>
            )}
        </FormItem>
    )
}
