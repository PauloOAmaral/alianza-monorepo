import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Await, Link, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { EmailField } from '~/components/form/fields/basic/email-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { loader, action as updateUserAction } from '~/routes/users-edit'
import { type UpdateUserFormInputType, type UpdateUserFormOutputType, useUpdateUserSchema } from './schema'
import { UserEditFormSkeleton } from './user-form-skeleton'

type User = Awaited<Awaited<ReturnType<typeof loader>>['user']>['data']

interface UserEditFormProps {
    user: User
}

export function UserEditForm({ user }: UserEditFormProps) {
    const { t } = useTranslation()
    const updateSchema = useUpdateUserSchema()
    const updateFetcher = useFetcher<typeof updateUserAction>()

    const form = useForm<UpdateUserFormInputType, unknown, UpdateUserFormOutputType>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            userId: user.id,
            email: user.email,
            firstName: user.userProfile?.firstName ?? '',
            lastName: user.userProfile?.lastName ?? ''
        }
    })

    useEffect(() => {
        form.reset({
            userId: user.id,
            email: user.email,
            firstName: user.userProfile?.firstName ?? '',
            lastName: user.userProfile?.lastName ?? ''
        })
    }, [form, user])

    async function handleSubmit(values: UpdateUserFormOutputType) {
        await updateFetcher.submit(objectToFormData(values), { method: 'POST' })
    }

    const isPending = updateFetcher.state !== 'idle'

    return (
        <BasicForm addProvider={form} className='space-y-6' onSubmit={handleSubmit}>
            <FieldGroup className='grid gap-4 md:grid-cols-2'>
                <TextField label={t('fields.users.firstName.label')} name='firstName' />
                <TextField label={t('fields.users.lastName.label')} name='lastName' />
                <EmailField label={t('fields.users.email.label')} name='email' required />
            </FieldGroup>

            <div className='flex flex-wrap items-center gap-2'>
                <Button asChild type='button' variant='outline'>
                    <Link to='/users'>{t('buttons.cancel')}</Link>
                </Button>
                <Button isPending={isPending} type='submit'>
                    {t('buttons.save')}
                </Button>
            </div>
        </BasicForm>
    )
}

export function UserEditDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={open => {
                if (!open) navigate('/users')
            }}
            open={true}
        >
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.users.edit.title')}</DialogTitle>
                    <DialogDescription>{t('dialogs.users.edit.description')}</DialogDescription>
                </DialogHeader>
                <Separator />
                <Suspense fallback={<UserEditFormSkeleton />}>
                    <Await errorElement={<div>{t('errors.databaseNotFound')}</div>} resolve={user}>
                        {userResult => <UserEditForm user={userResult.data} />}
                    </Await>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}
