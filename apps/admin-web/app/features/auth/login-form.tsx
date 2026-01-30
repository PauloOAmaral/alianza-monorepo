import { Button } from '@alianza/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@alianza/ui/components/ui/card'
import { Field, FieldGroup } from '@alianza/ui/components/ui/field'
import { type TurnstileInstance, TurnstileWidget } from '@alianza/ui/components/ui/turnstile'
import { cn } from '@alianza/ui/utils/cn'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFetcher, useLoaderData } from 'react-router'
import { EmailField } from '~/components/form/fields/basic/email-field'
import { PasswordField } from '~/components/form/fields/basic/password-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { loader } from '~/routes/login'
import { type LoginWithPasswordType, useLoginWithPasswordSchema } from './schema'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    const { t } = useTranslation()
    const loginWithPasswordSchema = useLoginWithPasswordSchema()

    const { siteKey } = useLoaderData<typeof loader>()

    const loginWithPasswordFetcher = useFetcher()
    const turnstileRef = useRef<TurnstileInstance>(null)

    const form = useForm<LoginWithPasswordType>({
        resolver: zodResolver(loginWithPasswordSchema),
        defaultValues: {
            intent: 'login-with-password',
            email: '',
            password: ''
        }
    })

    async function handleSubmit(values: LoginWithPasswordType) {
        await loginWithPasswordFetcher.submit(objectToFormData(values), { method: 'POST' })

        turnstileRef.current?.reset()
    }

    const isPending = loginWithPasswordFetcher.state !== 'idle'

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>{t('formPages.login.title')}</CardTitle>
                    <CardDescription>{t('formPages.login.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <BasicForm addProvider={form} onSubmit={handleSubmit}>
                        <FieldGroup>
                            <EmailField label='Email' name='email' placeholder='m@example.com' />
                            <PasswordField name='password' />
                            <div className='flex flex-1'>
                                <TurnstileWidget onChange={value => form.setValue('cf-turnstile-response', value)} options={{ size: 'flexible' }} ref={turnstileRef} siteKey={siteKey} />
                            </div>
                            <Field>
                                <Button isPending={isPending} type='submit'>
                                    Login
                                </Button>
                            </Field>
                        </FieldGroup>
                    </BasicForm>
                </CardContent>
            </Card>
        </div>
    )
}
