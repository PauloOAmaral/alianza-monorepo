import { ageValues, studyReasonValues } from '@alianza/database/types/enum'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const normalizeOptionalText = (value: unknown) => {
    if (typeof value !== 'string') return value
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
}

export function scheduleExperimentalClassSchema(t: TFunction) {
    return z.object({
        leadId: z.string().min(1),
        teacherId: z.string().min(1, { message: t('fields.leads.experimentalTeacher.required') }),
        classDate: z.coerce.date().refine(value => !Number.isNaN(value.getTime()), { message: t('fields.leads.experimentalDate.required') }),
        classTime: z.string().min(1, { message: t('fields.leads.experimentalTime.required') }),
        disciplineId: z.string().min(1, { message: t('fields.leads.disciplineId.required') }),
        age: z.enum(ageValues, { message: t('fields.leads.age.required') }),
        studyReason: z.enum(studyReasonValues, { message: t('fields.leads.studyReason.required') }),
        observation: z.preprocess(normalizeOptionalText, z.string().max(1000).optional()),
        countryId: z.string().min(1, { message: t('fields.leads.country.required') }),
        city: z.string().trim().min(1, { message: t('fields.leads.city.required') }).max(120)
    })
}

export function useScheduleExperimentalClassSchema() {
    const { t } = useTranslation()
    return scheduleExperimentalClassSchema(t)
}

export type ScheduleExperimentalClassFormInputType = z.input<ReturnType<typeof scheduleExperimentalClassSchema>>
export type ScheduleExperimentalClassFormOutputType = z.output<ReturnType<typeof scheduleExperimentalClassSchema>>
