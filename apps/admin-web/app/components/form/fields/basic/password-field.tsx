import { Field, FieldError, FieldLabel, FormField, FormItem } from '@alianza/ui/components/ui/field'
import { Input } from '@alianza/ui/components/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function PasswordField({ name }: { name: FieldPath<FieldValues> }) {
    const { control } = useFormContext<FieldValues>()
    const { t } = useTranslation()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className='flex items-center'>
                        <FieldLabel htmlFor='password'>{t('fields.password')}</FieldLabel>
                        <a className='ml-auto inline-block text-sm underline-offset-4 hover:underline' href='/forgot-password'>
                            {t('fields.forgotPassword')}
                        </a>
                    </div>

                    <Field>
                        <Input {...field} type='password' />
                    </Field>
                    <FieldError />
                </FormItem>
            )}
        />
    )
}
