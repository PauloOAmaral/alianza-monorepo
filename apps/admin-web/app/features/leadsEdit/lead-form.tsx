import { ageOptions, campaignSourceOptions, genderOptions, leadStatusOptions } from '@alianza/application/utils/enums/age'
import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@alianza/ui/components/ui/tabs'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Await, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { EmailField } from '~/components/form/fields/basic/email-field'
import { PhoneCountryField } from '~/components/form/fields/basic/phone-country-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { TextareaFields } from '~/components/form/fields/basic/textarea-field'
import { BaseSelectField } from '~/components/shared/base-select-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { loader, action as updateLeadAction } from '~/routes/leads-edit'
import { LeadEditFormSkeleton } from './lead-form-skeleton'
import { type UpdateLeadFormInputType, type UpdateLeadFormOutputType, useUpdateLeadSchema } from './schema'

interface LeadEditFormProps {
    lead: Awaited<Awaited<ReturnType<typeof loader>>['lead']>['data']
    campaigns: Awaited<Awaited<ReturnType<typeof loader>>['campaigns']>['data']
    phoneCountries: Awaited<Awaited<ReturnType<typeof loader>>['phoneCountries']>['data']['countries']
}

function LeadEditForm({ lead, campaigns, phoneCountries }: LeadEditFormProps) {
    const { t } = useTranslation()

    const updateSchema = useUpdateLeadSchema()

    const updateFetcher = useFetcher<typeof updateLeadAction>()

    const form = useForm<UpdateLeadFormInputType, any, UpdateLeadFormOutputType>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            leadId: lead.id,
            name: lead.name,
            primaryPhoneCountryCode: lead.primaryPhoneCountryCode ?? undefined,
            primaryPhoneNumber: lead.primaryPhoneNumber,
            email: lead.email ?? undefined,
            source: lead.leadSource ?? undefined,
            internalCampaignId: lead.internalCampaignId ?? undefined,
            status: lead.status ?? undefined,
            sellerId: lead.sellerId ?? undefined,
            companyId: lead.companyId ?? undefined,
            disciplineId: lead.disciplineId ?? undefined,
            secondaryPhoneCountryCode: lead.secondaryPhoneCountryCode ?? undefined,
            secondaryPhoneNumber: lead.secondaryPhoneNumber ?? undefined,
            gender: lead.gender ?? undefined,
            age: lead.age ?? undefined,
            reason: lead.reason ?? undefined,
            eventSourceUrl: lead.eventSourceUrl ?? undefined,
            allowDuplicateEmail: false,
            allowDuplicatePhone: false
        }
    })

    useEffect(() => {
        form.reset({
            leadId: lead.id,
            name: lead.name,
            primaryPhoneCountryCode: lead.primaryPhoneCountryCode ?? undefined,
            primaryPhoneNumber: lead.primaryPhoneNumber,
            email: lead.email ?? undefined,
            source: lead.leadSource ?? undefined,
            internalCampaignId: lead.internalCampaignId ?? undefined,
            status: lead.status ?? undefined,
            sellerId: lead.sellerId ?? undefined,
            companyId: lead.companyId ?? undefined,
            disciplineId: lead.disciplineId ?? undefined,
            secondaryPhoneCountryCode: lead.secondaryPhoneCountryCode ?? undefined,
            secondaryPhoneNumber: lead.secondaryPhoneNumber ?? undefined,
            gender: lead.gender ?? undefined,
            age: lead.age ?? undefined,
            reason: lead.reason ?? undefined,
            eventSourceUrl: lead.eventSourceUrl ?? undefined,
            allowDuplicateEmail: false,
            allowDuplicatePhone: false
        })
    }, [form, lead])

    async function handleSubmit(values: UpdateLeadFormOutputType) {
        await updateFetcher.submit(objectToFormData(values), { method: 'POST', action: '/leads/edit' })
    }

    const isPending = updateFetcher.state !== 'idle'

    return (
        <BasicForm addProvider={form} onSubmit={handleSubmit}>
            <Tabs className='space-y-4' defaultValue='identification'>
                <TabsList className='grid w-full grid-cols-2 gap-2 md:grid-cols-4'>
                    <TabsTrigger value='identification'>{t('dialogs.leads.sections.identification')}</TabsTrigger>
                    <TabsTrigger value='contact'>{t('dialogs.leads.sections.contact')}</TabsTrigger>
                    <TabsTrigger value='source'>{t('dialogs.leads.sections.source')}</TabsTrigger>
                    <TabsTrigger value='context'>{t('dialogs.leads.sections.context')}</TabsTrigger>
                </TabsList>

                <TabsContent value='identification'>
                    <FieldGroup className='grid gap-4 md:grid-cols-2'>
                        <TextField label={t('fields.leads.name.label')} name='name' required />
                        <BaseSelectField items={leadStatusOptions} label={t('fields.leads.status.label')} name='status' />
                        <BaseSelectField items={genderOptions} label={t('fields.leads.gender.label')} name='gender' />
                        <BaseSelectField items={ageOptions} label={t('fields.leads.age.label')} name='age' />
                        <TextareaFields label={t('fields.leads.reason.label')} name='reason' />
                    </FieldGroup>
                </TabsContent>

                <TabsContent value='contact'>
                    <FieldGroup className='grid gap-4 md:grid-cols-2'>
                        <EmailField label={t('fields.leads.email.label')} name='email' />

                        <PhoneCountryField
                            className='md:col-span-2'
                            countryCodeName='primaryPhoneCountryCode'
                            items={phoneCountries.filter((c): c is typeof c & { phoneCountryCode: string } => c.phoneCountryCode != null)}
                            label={t('fields.leads.phoneNumber.label')}
                            numberName='primaryPhoneNumber'
                            required
                        />

                        <PhoneCountryField
                            className='md:col-span-2'
                            countryCodeName='secondaryPhoneCountryCode'
                            items={phoneCountries.filter((c): c is typeof c & { phoneCountryCode: string } => c.phoneCountryCode != null)}
                            label={t('fields.leads.secondaryPhoneNumber.label')}
                            numberName='secondaryPhoneNumber'
                        />
                    </FieldGroup>
                </TabsContent>

                <TabsContent value='source'>
                    <FieldGroup className='grid gap-4 md:grid-cols-2'>
                        <BaseSelectField items={campaignSourceOptions} label={t('fields.leads.source.label')} name='source' required />
                        <BaseSelectField items={campaigns} label={t('fields.leads.campaign.label')} name='internalCampaignId' />
                        <div className='md:col-span-2'>
                            <TextField label={t('fields.leads.eventSourceUrl.label')} name='eventSourceUrl' />
                        </div>
                    </FieldGroup>
                </TabsContent>

                <TabsContent value='context'>
                    <FieldGroup className='grid gap-4 md:grid-cols-2'>
                        <TextField label={t('fields.leads.sellerId.label')} name='sellerId' />
                        <TextField label={t('fields.leads.companyId.label')} name='companyId' />
                        <TextField label={t('fields.leads.disciplineId.label')} name='disciplineId' />
                    </FieldGroup>
                </TabsContent>
            </Tabs>

            <div className='flex flex-wrap items-center gap-2'>
                <Button isPending={isPending} type='submit'>
                    {t('buttons.save')}
                </Button>
            </div>
        </BasicForm>
    )
}

export function LeadEditDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { lead, campaigns, phoneCountries } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={open => {
                if (!open) navigate('/leads')
            }}
            open={true}
        >
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.leads.edit.title')}</DialogTitle>
                    <DialogDescription>{t('dialogs.leads.edit.description')}</DialogDescription>
                </DialogHeader>
                <Separator />
                <Suspense fallback={<LeadEditFormSkeleton />}>
                    <Await errorElement={t('errors.databaseNotFound')} resolve={Promise.all([lead, campaigns, phoneCountries])}>
                        {([leadResult, campaignsResult, phoneCountriesResult]) => (
                            <LeadEditForm campaigns={campaignsResult.data} lead={leadResult.data} phoneCountries={phoneCountriesResult.data.countries} />
                        )}
                    </Await>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}
