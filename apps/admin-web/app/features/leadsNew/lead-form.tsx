import { campaignSourceOptions, genderOptions } from '@alianza/application/utils/enums/age'
import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { alpha2ToFlag } from '@alianza/utils/common'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Await, Link, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { EmailField } from '~/components/form/fields/basic/email-field'
import { PhoneField } from '~/components/form/fields/basic/phone-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { BaseSelectField } from '~/components/shared/base-select-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { action as createLeadAction, loader } from '~/routes/leads-new'
import { LeadEditFormSkeleton } from '../leadsEdit/lead-form-skeleton'
import { type CreateLeadFormInputType, type CreateLeadFormOutputType, useCreateLeadSchema } from './schema'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { FieldSkeleton, TextareaFieldSkeleton } from '~/components/basic/field-skeleton'
import { LeadNewFormSkeleton } from './lead-form-skeleton'

interface LeadFormProps {
    campaigns: Awaited<Awaited<ReturnType<typeof loader>>['campaigns']>['data']
    phoneCountries: Awaited<Awaited<ReturnType<typeof loader>>['phoneCountries']>['data']['countries']
}

export function LeadForm({ campaigns, phoneCountries }: LeadFormProps) {
    const { t } = useTranslation()

    const createLeadSchema = useCreateLeadSchema()

    const createLeadFetcher = useFetcher<typeof createLeadAction>()

    const form = useForm<CreateLeadFormInputType, any, CreateLeadFormOutputType>({
        resolver: zodResolver(createLeadSchema),
        defaultValues: {
            name: '',
            primaryPhoneCountryCode: '',
            primaryPhoneNumber: '',
            email: '',
            source: undefined,
            internalCampaignId: '',
            gender: undefined,
            sellerId: '',
            companyId: ''
        }
    })

    async function handleSubmit(values: CreateLeadFormOutputType) {
        await createLeadFetcher.submit(objectToFormData(values), { method: 'POST' })
    }

    const isPending = createLeadFetcher.state !== 'idle'

    return (
        <BasicForm addProvider={form} onSubmit={handleSubmit}>
            <FieldGroup className='grid gap-4 grid-cols-1'>
                <TextField label={t('fields.leads.name.label')} name='name' required />

                <div className='grid gap-2 sm:grid-cols-[220px_1fr]'>
                    <BaseSelectField items={phoneCountries} label={t('fields.leads.phoneCountryCode.label')} name='primaryPhoneCountryCode' required>
                        {option => (
                            <>
                                <span className='mr-2'>{alpha2ToFlag(option.countryAlpha2Code)}</span>
                                <span className='truncate'>{option.name}</span>
                                <span className='ml-auto text-muted-foreground'>+{option.phoneCountryCode}</span>
                            </>
                        )}
                    </BaseSelectField>

                    <PhoneField label={t('fields.leads.phoneNumber.label')} name='primaryPhoneNumber' required />
                </div>

                <EmailField label={t('fields.leads.email.label')} name='email' />

                <BaseSelectField items={genderOptions} label={t('fields.leads.gender.label')} name='gender' />
                <BaseSelectField items={campaignSourceOptions} label={t('fields.leads.source.label')} name='source' required />
                <BaseSelectField items={campaigns} label={t('fields.leads.campaign.label')} name='internalCampaignId' />
                <TextField label={t('fields.leads.sellerId.label')} name='sellerId' />
            </FieldGroup>

            <div className='flex flex-wrap items-center gap-2'>
                <Button asChild type='button' variant='outline'>
                    <Link to='/leads'>{t('buttons.cancel')}</Link>
                </Button>
                <Button isPending={isPending} type='submit'>
                    {t('buttons.save')}
                </Button>
            </div>
        </BasicForm>
    )
}

export function LeadNewDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { campaigns, phoneCountries } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={open => {
                if (!open) navigate('/leads')
            }}
            open={true}
        >
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.leads.new.title')}</DialogTitle>
                    <DialogDescription>{t('dialogs.leads.new.description')}</DialogDescription>
                </DialogHeader>
                <Separator />
                <Suspense fallback={<LeadNewFormSkeleton />}>
                    <Await errorElement={<div>{t('errors.databaseNotFound')}</div>} resolve={Promise.all([campaigns, phoneCountries])}>
                        {([campaignsResult, phoneCountriesResult]) => (
                            <LeadForm campaigns={campaignsResult.data} phoneCountries={phoneCountriesResult.data.countries} />
                        )}
                    </Await>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}