import { ageOptions, studyReasonOptions } from '@alianza/application/utils/enums/age'
import { studyReasonValues } from '@alianza/database/types/enum'
import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Await, Link, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { DateField } from '~/components/form/fields/basic/date-field'
import { TextField } from '~/components/form/fields/basic/text-field'
import { BaseSelectField } from '~/components/shared/base-select-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { action, loader } from '~/routes/leads-schedule-experimental'
import { type ScheduleExperimentalClassFormInputType, type ScheduleExperimentalClassFormOutputType, useScheduleExperimentalClassSchema } from './schema'

type RouteActionData =
    | { status: 'availability'; slots: Array<{ id: string; name: string }> }
    | { status: 'scheduled'; scheduleCode: string; classId: string }

interface ScheduleFormProps {
    lead: Awaited<Awaited<ReturnType<typeof loader>>['lead']>['data']
    teachers: Awaited<Awaited<ReturnType<typeof loader>>['teachers']>['data']
    disciplines: Awaited<Awaited<ReturnType<typeof loader>>['disciplines']>['data']
    countries: Awaited<Awaited<ReturnType<typeof loader>>['countries']>['data']
}

function normalizePhoneCountryCode(value?: string | null) {
    if (!value) return null

    const normalized = value.replace(/\D+/g, '')
    const trimmed = normalized.replace(/^0+/, '')

    return trimmed.length > 0 ? trimmed : null
}

function ScheduleForm({ lead, teachers, disciplines, countries }: ScheduleFormProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const schema = useScheduleExperimentalClassSchema()
    const availabilityFetcher = useFetcher<typeof action>()
    const scheduleFetcher = useFetcher<typeof action>()

    const [slots, setSlots] = useState<Array<{ id: string; name: string }>>([])
    const [scheduleCode, setScheduleCode] = useState<string | null>(null)
    const lastAvailabilityKeyRef = useRef<string>('')

    const initialValues = useMemo<ScheduleExperimentalClassFormInputType>(() => {
        const leadPhoneCode = normalizePhoneCountryCode(lead.primaryPhoneCountryCode)
        const countryFromLead = countries.find(country => normalizePhoneCountryCode(country.phoneCountryCode) === leadPhoneCode)
        const reasonFromLead = (lead.reason ?? '').trim()
        const studyReasonFromLead = studyReasonValues.includes(reasonFromLead as (typeof studyReasonValues)[number])
            ? (reasonFromLead as (typeof studyReasonValues)[number])
            : undefined

        return {
            leadId: lead.id,
            teacherId: '',
            classDate: undefined,
            classTime: '',
            disciplineId: lead.disciplineId ?? '',
            age: lead.age ?? undefined,
            studyReason: studyReasonFromLead,
            observation: reasonFromLead,
            countryId: countryFromLead?.id ?? '',
            city: ''
        }
    }, [countries, lead.age, lead.disciplineId, lead.id, lead.primaryPhoneCountryCode, lead.reason])

    const form = useForm<ScheduleExperimentalClassFormInputType, any, ScheduleExperimentalClassFormOutputType>({
        resolver: zodResolver(schema),
        defaultValues: initialValues
    })

    useEffect(() => {
        form.reset(initialValues)
    }, [form, initialValues])

    const teacherId = form.watch('teacherId')
    const classDate = form.watch('classDate')

    const availabilityData = availabilityFetcher.data as RouteActionData | undefined
    const scheduleData = scheduleFetcher.data as RouteActionData | undefined

    useEffect(() => {
        if (!(classDate instanceof Date) || !teacherId) {
            setSlots([])
            form.setValue('classTime', '')
            return
        }

        const key = `${teacherId}:${classDate.toISOString().slice(0, 10)}`
        if (lastAvailabilityKeyRef.current === key) {
            return
        }

        lastAvailabilityKeyRef.current = key
        availabilityFetcher.submit(
            objectToFormData({
                intent: 'availability',
                teacherId,
                classDate
            }),
            { method: 'POST' }
        )
    }, [availabilityFetcher, classDate, form, teacherId])

    useEffect(() => {
        if (availabilityData?.status !== 'availability') return
        setSlots(availabilityData.slots)

        const selected = form.getValues('classTime')
        if (selected && !availabilityData.slots.some(slot => slot.id === selected)) {
            form.setValue('classTime', '')
        }
    }, [availabilityData, form])

    useEffect(() => {
        if (scheduleData?.status !== 'scheduled') return
        setScheduleCode(scheduleData.scheduleCode)
    }, [scheduleData])

    async function handleSubmit(values: ScheduleExperimentalClassFormOutputType) {
        await scheduleFetcher.submit(
            objectToFormData({
                ...values,
                intent: 'schedule'
            }),
            { method: 'POST' }
        )
    }

    const isPending = scheduleFetcher.state !== 'idle'
    const slotItems = useMemo(() => slots, [slots])

    return (
        <BasicForm addProvider={form} onSubmit={handleSubmit}>
            <FieldGroup className='grid gap-4 md:grid-cols-2'>
                <BaseSelectField items={teachers} label={t('fields.leads.experimentalTeacher.label')} name='teacherId' required />
                <DateField label={t('fields.leads.experimentalDate.label')} name='classDate' required />
                <BaseSelectField disabled={!teacherId || !(classDate instanceof Date)} items={slotItems} label={t('fields.leads.experimentalTime.label')} name='classTime' required />
                <BaseSelectField items={disciplines} label={t('fields.leads.disciplineId.label')} name='disciplineId' required />
                <BaseSelectField items={ageOptions} label={t('fields.leads.age.label')} name='age' required />
                <BaseSelectField items={studyReasonOptions} label={t('fields.leads.studyReason.label')} name='studyReason' required />
                <BaseSelectField items={countries} label={t('fields.leads.country.label')} name='countryId' required />
                <TextField label={t('fields.leads.city.label')} name='city' required />
                <div className='md:col-span-2'>
                    <TextField label={t('fields.leads.experimentalObservation.label')} name='observation' />
                </div>
            </FieldGroup>

            {scheduleCode && <p className='text-sm font-medium text-green-700'>{t('dialogs.leads.schedule.code', { code: scheduleCode })}</p>}

            <div className='flex flex-wrap items-center gap-2'>
                <Button asChild type='button' variant='outline'>
                    <Link to='/leads'>{t('buttons.cancel')}</Link>
                </Button>
                <Button isPending={isPending} type='submit'>
                    {t('dialogs.leads.schedule.confirm')}
                </Button>
                {scheduleCode && (
                    <Button onClick={() => navigate('/leads')} type='button' variant='outline'>
                        {t('dialogs.leads.schedule.finish')}
                    </Button>
                )}
            </div>
        </BasicForm>
    )
}

export function LeadScheduleExperimentalDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { lead, teachers, disciplines, countries } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={open => {
                if (!open) navigate('/leads')
            }}
            open={true}
        >
            <DialogContent className='max-w-3xl'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.leads.schedule.title')}</DialogTitle>
                    <DialogDescription>{t('dialogs.leads.schedule.description')}</DialogDescription>
                </DialogHeader>
                <Separator />
                <Suspense fallback={<div>{t('dialogs.leads.schedule.loading')}</div>}>
                    <Await errorElement={<div>{t('errors.databaseNotFound')}</div>} resolve={Promise.all([lead, teachers, disciplines, countries])}>
                        {([leadResult, teachersResult, disciplinesResult, countriesResult]) => (
                            <ScheduleForm lead={leadResult.data} teachers={teachersResult.data} disciplines={disciplinesResult.data} countries={countriesResult.data} />
                        )}
                    </Await>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}
