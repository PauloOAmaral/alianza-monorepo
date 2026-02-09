import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@alianza/ui/alert-dialog'
import { Button } from '@alianza/ui/components/ui/button'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@alianza/ui/components/ui/tabs'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFetcher } from 'react-router'
import { EmailField } from '~/components/form/fields/basic/email-field'
import { PhoneCountryField } from '~/components/form/fields/basic/phone-country-field'
import { SelectField } from '~/components/form/fields/basic/select-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { TextareaFields } from '~/components/form/fields/basic/textarea-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { action as updateLeadAction } from '~/routes/leads.edit'
import { leadSourceOptions, leadSourceValueByCode } from './lead-sources'
import { leadStatusOptions } from './lead-statuses'
import { type UpdateLeadFormType, useUpdateLeadSchema } from './schema'

type CampaignOption = {
    id: string
    name: string
}

type DuplicateInfo = {
    phone?: {
        source: 'lead' | 'student'
    }
    email?: {
        source: 'lead' | 'student'
    }
}

type LeadEditData = {
    id: string
    name: string
    primaryPhoneCountryCode: string | null
    primaryPhoneNumber: string
    email: string | null
    leadSource: number | null
    internalCampaignId: string | null
    status: string | null
    sellerId: string | null
    companyId: string | null
    disciplineId: string | null
    secondaryPhoneCountryCode: string | null
    secondaryPhoneNumber: string | null
    gender: string | null
    age: string | null
    reason: string | null
    eventSourceUrl: string | null
}

export function LeadEditForm({
    campaigns,
    phoneCountries,
    lead,
    onSuccess
}: {
    campaigns: CampaignOption[]
    phoneCountries: Array<{
        id: string
        name: string
        countryAlpha2Code: string | null
        phoneCountryCode: string | null
    }>
    lead: LeadEditData
    onSuccess?: () => void
}) {
    const { t } = useTranslation()
    const updateSchema = useUpdateLeadSchema()

    const updateFetcher = useFetcher<typeof updateLeadAction>()
    const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(null)

    const form = useForm<UpdateLeadFormType>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            intent: 'update-lead',
            leadId: lead.id,
            name: lead.name,
            primaryPhoneCountryCode: lead.primaryPhoneCountryCode ?? undefined,
            primaryPhoneNumber: lead.primaryPhoneNumber,
            email: lead.email ?? undefined,
            source: leadSourceValueByCode.get(lead.leadSource ?? 0),
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
            intent: 'update-lead',
            leadId: lead.id,
            name: lead.name,
            primaryPhoneCountryCode: lead.primaryPhoneCountryCode ?? undefined,
            primaryPhoneNumber: lead.primaryPhoneNumber,
            email: lead.email ?? undefined,
            source: leadSourceValueByCode.get(lead.leadSource ?? 0),
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

    useEffect(() => {
        if (!updateFetcher.data) return

        if (updateFetcher.data.status === 'duplicate') {
            setDuplicateInfo(updateFetcher.data.duplicate ?? null)
            return
        }

        if (updateFetcher.data.status === 'updated') {
            onSuccess?.()
        }
    }, [updateFetcher.data, onSuccess])

    const sourceOptions = useMemo(
        () =>
            leadSourceOptions.map(option => ({
                value: option.value,
                label: t(option.labelKey)
            })),
        [t]
    )

    const genderOptions = useMemo(
        () => [
            { value: 'unknown', label: t('leads.form.gender.unknown') },
            { value: 'masculine', label: t('leads.form.gender.masculine') },
            { value: 'feminine', label: t('leads.form.gender.feminine') }
        ],
        [t]
    )

    const statusOptions = useMemo(
        () =>
            leadStatusOptions.map(option => ({
                value: option.value,
                label: t(option.labelKey)
            })),
        [t]
    )

    const ageOptions = useMemo(
        () => [
            { value: 'under_12', label: t('leads.form.age.under_12') },
            { value: 'from_12_to_18', label: t('leads.form.age.from_12_to_18') },
            { value: 'from_18_to_22', label: t('leads.form.age.from_18_to_22') },
            { value: 'from_22_to_28', label: t('leads.form.age.from_22_to_28') },
            { value: 'from_28_to_40', label: t('leads.form.age.from_28_to_40') },
            { value: 'from_40_to_65', label: t('leads.form.age.from_40_to_65') },
            { value: 'older_65', label: t('leads.form.age.older_65') }
        ],
        [t]
    )

    const campaignOptions = useMemo(() => {
        const options = campaigns.map(option => ({
            value: option.id,
            label: option.name
        }))

        return [{ value: '__none__', label: t('leads.form.placeholders.noCampaign') }, ...options]
    }, [campaigns, t])

    async function handleSubmit(values: UpdateLeadFormType) {
        await updateFetcher.submit(objectToFormData(values), { method: 'POST', action: '/leads/edit' })
    }

    async function handleDuplicateConfirm() {
        if (!duplicateInfo) return

        const values = form.getValues()

        await updateFetcher.submit(
            objectToFormData({
                ...values,
                allowDuplicatePhone: Boolean(duplicateInfo.phone),
                allowDuplicateEmail: Boolean(duplicateInfo.email)
            }),
            { method: 'POST', action: '/leads/edit' }
        )

        setDuplicateInfo(null)
    }

    const duplicateMessage = useMemo(() => {
        if (!duplicateInfo) return ''

        if (duplicateInfo.phone && duplicateInfo.email) {
            return t('leads.messages.duplicatePhoneAndEmail')
        }

        if (duplicateInfo.phone) {
            return t('leads.messages.duplicatePhone', {
                phone: form.getValues().primaryPhoneNumber
            })
        }

        return t('leads.messages.duplicateEmail', {
            email: form.getValues().email ?? ''
        })
    }, [duplicateInfo, form, t])

    const isPending = updateFetcher.state !== 'idle'

    return (
        <>
            <BasicForm addProvider={form} onSubmit={handleSubmit}>
                <Tabs className='space-y-4' defaultValue='identification'>
                    <TabsList className='grid w-full grid-cols-2 gap-2 md:grid-cols-4'>
                        <TabsTrigger value='identification'>{t('leads.form.sections.identification')}</TabsTrigger>
                        <TabsTrigger value='contact'>{t('leads.form.sections.contact')}</TabsTrigger>
                        <TabsTrigger value='source'>{t('leads.form.sections.source')}</TabsTrigger>
                        <TabsTrigger value='context'>{t('leads.form.sections.context')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value='identification'>
                        <FieldGroup className='grid gap-4 md:grid-cols-2'>
                            <TextField label={t('leads.form.fields.name')} name='name' placeholder={t('leads.form.placeholders.name')} required />
                            <SelectField label={t('leads.form.fields.status')} name='status' options={statusOptions} placeholder={t('leads.form.placeholders.status')} />
                            <SelectField label={t('leads.form.fields.gender')} name='gender' options={genderOptions} placeholder={t('leads.form.placeholders.gender')} />
                            <SelectField label={t('leads.form.fields.age')} name='age' options={ageOptions} placeholder={t('leads.form.placeholders.age')} />
                            <TextareaFields label={t('leads.form.fields.reason')} name='reason' placeholder={t('leads.form.placeholders.reason')} />
                        </FieldGroup>
                    </TabsContent>

                    <TabsContent value='contact'>
                        <FieldGroup className='grid gap-4 md:grid-cols-2'>
                            <EmailField label={t('leads.form.fields.email')} name='email' placeholder={t('leads.form.placeholders.email')} />
                            <PhoneCountryField
                                className='md:col-span-2'
                                countryCodeName='primaryPhoneCountryCode'
                                label={t('leads.form.fields.phone')}
                                numberName='primaryPhoneNumber'
                                options={phoneCountries.filter(country => country.phoneCountryCode)}
                                placeholderCountry={t('leads.form.placeholders.phoneCountryCode')}
                                placeholderNumber={t('leads.form.placeholders.phoneNumber')}
                                required
                            />
                            <PhoneCountryField
                                className='md:col-span-2'
                                countryCodeName='secondaryPhoneCountryCode'
                                label={t('leads.form.fields.secondaryPhone')}
                                numberName='secondaryPhoneNumber'
                                options={phoneCountries.filter(country => country.phoneCountryCode)}
                                placeholderCountry={t('leads.form.placeholders.phoneCountryCode')}
                                placeholderNumber={t('leads.form.placeholders.phoneNumber')}
                            />
                        </FieldGroup>
                    </TabsContent>

                    <TabsContent value='source'>
                        <FieldGroup className='grid gap-4 md:grid-cols-2'>
                            <SelectField label={t('leads.form.fields.source')} name='source' options={sourceOptions} placeholder={t('leads.form.placeholders.source')} required />
                            <SelectField label={t('leads.form.fields.campaign')} name='internalCampaignId' options={campaignOptions} placeholder={t('leads.form.placeholders.campaign')} />
                            <div className='md:col-span-2'>
                                <TextField label={t('leads.form.fields.eventSourceUrl')} name='eventSourceUrl' placeholder={t('leads.form.placeholders.eventSourceUrl')} />
                            </div>
                        </FieldGroup>
                    </TabsContent>

                    <TabsContent value='context'>
                        <FieldGroup className='grid gap-4 md:grid-cols-2'>
                            <TextField label={t('leads.form.fields.sellerId')} name='sellerId' placeholder={t('leads.form.placeholders.sellerId')} />
                            <TextField label={t('leads.form.fields.companyId')} name='companyId' placeholder={t('leads.form.placeholders.companyId')} />
                            <TextField label={t('leads.form.fields.disciplineId')} name='disciplineId' placeholder={t('leads.form.placeholders.disciplineId')} />
                        </FieldGroup>
                    </TabsContent>
                </Tabs>

                <div className='flex flex-wrap items-center gap-2'>
                    <Button isPending={isPending} type='submit'>
                        {t('leads.edit.actions.save')}
                    </Button>
                </div>
            </BasicForm>

            {duplicateInfo ? (
                <AlertDialog onOpenChange={open => !open && setDuplicateInfo(null)} open>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t('leads.messages.duplicateTitle')}</AlertDialogTitle>
                            <AlertDialogDescription>{duplicateMessage}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDuplicateInfo(null)} type='button' variant='outline'>
                                {t('leads.messages.duplicateCancel')}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDuplicateConfirm} type='button'>
                                {t('leads.messages.duplicateConfirm')}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : null}
        </>
    )
}
