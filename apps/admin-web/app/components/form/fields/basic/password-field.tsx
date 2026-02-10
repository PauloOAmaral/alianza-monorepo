import { Input } from '@alianza/ui/components/ui/input'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFields, type BaseFieldsChildrenProps } from '../../base-field'

export function PasswordField({
    name,
    label,
    required,
    readOnly
}: BaseFieldsChildrenProps<FieldValues, FieldPath<FieldValues>>) {
    const { t } = useTranslation()

    const labelNode = (
        <span className='flex w-full justify-between'>
            <span>{label ?? t('fields.auth.password.label')}</span>
            <a className='inline-block text-sm underline-offset-4 hover:underline' href='/forgot-password'>
                {t('fields.auth.password.forgotPassword')}
            </a>
        </span>
    )

    return (
        <BaseFields label={labelNode} name={name} required={required}>
            {({ register }) => <Input {...register(name)} readOnly={readOnly} type='password' />}
        </BaseFields>
    )
}
