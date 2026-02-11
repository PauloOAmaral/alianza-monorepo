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
import { NumberField } from '~/components/form/fields/basic/number-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { action as updateSellerAction, loader } from '~/routes/sellers-edit'
import { type UpdateSellerFormInputType, type UpdateSellerFormOutputType, useUpdateSellerSchema } from './schema'
import { SellerEditFormSkeleton } from './seller-form-skeleton'

type Seller = Awaited<Awaited<ReturnType<typeof loader>>['seller']>['data']

function getSellerDisplayName(seller: Seller): string {
    const profile = seller.userContext?.user?.userProfile
    if (!profile) return '-'
    const first = profile.firstName ?? ''
    const last = profile.lastName ?? ''
    return `${first} ${last}`.trim() || '-'
}

interface SellerEditFormProps {
    seller: Seller
}

export function SellerEditForm({ seller }: SellerEditFormProps) {
    const { t } = useTranslation()
    const updateSchema = useUpdateSellerSchema()
    const updateFetcher = useFetcher<typeof updateSellerAction>()

    const form = useForm<UpdateSellerFormInputType, unknown, UpdateSellerFormOutputType>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            sellerId: seller.id,
            referralCode: seller.referralCode ?? '',
            leadPrefix: seller.leadPrefix ?? '',
            dailyToSell: seller.dailyToSell != null ? Number(seller.dailyToSell) : undefined,
            dailyExperimentalClass: seller.dailyExperimentalClass ?? undefined,
            pixelId: seller.pixelId ?? '',
            pixelSecret: seller.pixelSecret ?? '',
            isActive: seller.isActive
        }
    })

    useEffect(() => {
        form.reset({
            sellerId: seller.id,
            referralCode: seller.referralCode ?? '',
            leadPrefix: seller.leadPrefix ?? '',
            dailyToSell: seller.dailyToSell != null ? Number(seller.dailyToSell) : undefined,
            dailyExperimentalClass: seller.dailyExperimentalClass ?? undefined,
            pixelId: seller.pixelId ?? '',
            pixelSecret: seller.pixelSecret ?? '',
            isActive: seller.isActive
        })
    }, [form, seller])

    async function handleSubmit(values: UpdateSellerFormOutputType) {
        await updateFetcher.submit(objectToFormData(values), { method: 'POST' })
    }

    const isPending = updateFetcher.state !== 'idle'

    return (
        <BasicForm className='space-y-6' addProvider={form} onSubmit={handleSubmit}>
            <input type='hidden' {...form.register('sellerId')} />
            <FieldGroup className='grid gap-4 md:grid-cols-2'>
                <div className='md:col-span-2 space-y-2'>
                    <label className='text-sm font-medium'>{t('fields.sellers.userContext.label', { defaultValue: 'Usuário' })}</label>
                    <p className='text-muted-foreground text-sm'>{getSellerDisplayName(seller)}</p>
                </div>

                <TextField label={t('fields.sellers.referralCode.label', { defaultValue: 'Código de indicação' })} name='referralCode' required />

                <TextField label={t('fields.sellers.leadPrefix.label', { defaultValue: 'Prefixo de lead' })} name='leadPrefix' required />

                <NumberField label={t('fields.sellers.dailyToSell.label', { defaultValue: 'Meta diária de vendas' })} name='dailyToSell' />

                <NumberField label={t('fields.sellers.dailyExperimentalClass.label', { defaultValue: 'Aula experimental diária' })} name='dailyExperimentalClass' />

                <TextField label={t('fields.sellers.pixelId.label', { defaultValue: 'Pixel ID' })} name='pixelId' />

                <TextField label={t('fields.sellers.pixelSecret.label', { defaultValue: 'Pixel Secret' })} name='pixelSecret' />
            </FieldGroup>

            <div className='flex flex-wrap items-center gap-2'>
                <Button asChild type='button' variant='outline'>
                    <Link to='/sellers'>{t('buttons.cancel')}</Link>
                </Button>
                <Button isPending={isPending} type='submit'>
                    {t('buttons.save')}
                </Button>
            </div>
        </BasicForm>
    )
}

export function SellerEditDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { seller } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={open => {
                if (!open) navigate('/sellers')
            }}
            open={true}
        >
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.sellers.edit.title', { defaultValue: 'Editar vendedor' })}</DialogTitle>
                    <DialogDescription>{t('dialogs.sellers.edit.description', { defaultValue: 'Altere os dados do vendedor.' })}</DialogDescription>
                </DialogHeader>
                <Separator />
                <Suspense fallback={<SellerEditFormSkeleton />}>
                    <Await errorElement={<div>{t('errors.commonNotFound')}</div>} resolve={seller}>
                        {sellerResult => <SellerEditForm seller={sellerResult.data} />}
                    </Await>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}
