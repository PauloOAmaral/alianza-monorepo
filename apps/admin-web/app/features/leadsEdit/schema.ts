import { ageValues, campaignSourceValues, genderValues, leadStatusValues } from '@alianza/database/types/enum'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const stringToBoolean = z.preprocess(value => {
    if (typeof value === 'string') {
        return value === 'true'
    }

    return value
}, z.boolean())

export function updateLeadSchema(t: TFunction) {
    return z.object({
        leadId: z.string().min(1),
        name: z
            .string()
            .min(1, { message: t('fields.leads.name.required') })
            .max(200),
        primaryPhoneCountryCode: z
            .string()
            .min(1, { message: t('fields.leads.phoneNumber.required') })
            .max(4),
        primaryPhoneNumber: z
            .string()
            .min(1, { message: t('fields.leads.phoneNumber.required') })
            .refine(value => /[0-9]{8,15}/.test(value.replace(/\D+/g, '')), { message: t('fields.leads.phoneNumber.invalid') }),
        email: z.string()
            .email({ message: t('fields.leads.email.invalid') })
            .max(200)
            .transform(value => value.trim().toLowerCase()),
        source: z.enum(campaignSourceValues, { message: t('fields.leads.source.required') }),
        internalCampaignId: z.string().min(1),
        status: z.enum(leadStatusValues),
        sellerId: z.string().min(1),
        companyId: z.string().min(1),
        disciplineId: z.string().min(1),
        secondaryPhoneCountryCode: z.string().min(1).max(4),
        secondaryPhoneNumber: z.string().min(1).max(20),
        gender: z.enum(genderValues),
        age: z.enum(ageValues),
        reason: z.string().min(1),
        eventSourceUrl: z.string().min(1).max(500),
        allowDuplicatePhone: stringToBoolean.default(false),
        allowDuplicateEmail: stringToBoolean.default(false)
    })
}

export function useUpdateLeadSchema() {
    const { t } = useTranslation()

    return updateLeadSchema(t)
}

export type UpdateLeadFormInputType = z.input<ReturnType<typeof updateLeadSchema>>
export type UpdateLeadFormOutputType = z.output<ReturnType<typeof updateLeadSchema>>
