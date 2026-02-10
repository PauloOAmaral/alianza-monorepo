import { campaignSourceValues, genderValues } from '@alianza/database/types/enum'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'


export function createLeadSchema(t: TFunction) {
    return z.object({
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
            .refine(value => /[0-9]{8,15}/.test(value.replace(/\D+/g, '')), { message: t('fields.leads.phoneNumber.required') }),
        email: z.string()
            .email({ message: t('fields.leads.email.required') })
            .max(200)
            .transform(value => value.trim().toLowerCase()),
        internalCampaignId: z.string().min(1),
        sellerId: z.string().min(1),
        companyId: z.string().min(1),
        source: z.enum(campaignSourceValues, { message: t('fields.leads.source.required') }),
        gender: z.enum(genderValues),
    })
}

export function useCreateLeadSchema() {
    const { t } = useTranslation()

    return createLeadSchema(t)
}

export type CreateLeadFormInputType = z.input<ReturnType<typeof createLeadSchema>>
export type CreateLeadFormOutputType = z.output<ReturnType<typeof createLeadSchema>>
