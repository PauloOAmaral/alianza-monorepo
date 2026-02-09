import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { leadSourceOptions } from './lead-sources'

const leadSourceValues = leadSourceOptions.map(option => option.value) as [string, ...string[]]

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
    z.preprocess(value => (value === '' || value === '__none__' ? undefined : value), schema.optional())

const stringToBoolean = z.preprocess(value => {
    if (value === true || value === false) return value
    if (typeof value !== 'string') return false
    return value === 'true'
}, z.boolean())

const genderValues = ['unknown', 'masculine', 'feminine'] as const
const ageValues = [
    'under_12',
    'from_12_to_18',
    'from_18_to_22',
    'from_22_to_28',
    'from_28_to_40',
    'from_40_to_65',
    'older_65'
] as const
const statusValues = [
    'pre_analisys',
    'created',
    'in_service',
    'experimental_class',
    'experimental_class_missed',
    'feedback',
    'contract',
    'waiting_payment',
    'paid',
    'talk_later',
    'disqualified'
] as const

export function createLeadSchema(t: TFunction) {
    return z.object({
        intent: z.literal('create-lead'),
        name: z.string().min(1, { message: t('leads.form.errors.nameRequired') }).max(200),
        primaryPhoneCountryCode: z.string().min(1, { message: t('leads.form.errors.phoneCountryRequired') }).max(4),
        primaryPhoneNumber: z
            .string()
            .min(1, { message: t('leads.form.errors.phoneRequired') })
            .refine(value => /[0-9]{8,15}/.test(value.replace(/\D+/g, '')), { message: t('leads.form.errors.phoneInvalid') }),
        email: emptyToUndefined(
            z
                .string()
                .email({ message: t('leads.form.errors.emailInvalid') })
                .max(200)
                .transform(value => value.trim().toLowerCase())
        ),
        source: z.enum(leadSourceValues, { message: t('leads.form.errors.sourceRequired') }),
        internalCampaignId: emptyToUndefined(z.string().min(1)),
        status: emptyToUndefined(z.enum(statusValues)),
        sellerId: emptyToUndefined(z.string().min(1)),
        companyId: emptyToUndefined(z.string().min(1)),
        disciplineId: emptyToUndefined(z.string().min(1)),
        secondaryPhoneCountryCode: emptyToUndefined(z.string().min(1).max(4)),
        secondaryPhoneNumber: emptyToUndefined(z.string().min(1).max(20)),
        gender: emptyToUndefined(z.enum(genderValues)),
        age: emptyToUndefined(z.enum(ageValues)),
        reason: emptyToUndefined(z.string().min(1)),
        eventSourceUrl: emptyToUndefined(z.string().min(1).max(500)),
        allowDuplicatePhone: stringToBoolean.default(false),
        allowDuplicateEmail: stringToBoolean.default(false)
    })
}

export function useCreateLeadSchema() {
    const { t } = useTranslation()

    return createLeadSchema(t)
}

export type CreateLeadFormType = z.infer<ReturnType<typeof createLeadSchema>>

export function updateLeadSchema(t: TFunction) {
    return z.object({
        intent: z.literal('update-lead'),
        leadId: z.string().min(1),
        name: z.string().min(1, { message: t('leads.form.errors.nameRequired') }).max(200),
        primaryPhoneCountryCode: z.string().min(1, { message: t('leads.form.errors.phoneCountryRequired') }).max(4),
        primaryPhoneNumber: z
            .string()
            .min(1, { message: t('leads.form.errors.phoneRequired') })
            .refine(value => /[0-9]{8,15}/.test(value.replace(/\D+/g, '')), { message: t('leads.form.errors.phoneInvalid') }),
        email: emptyToUndefined(
            z
                .string()
                .email({ message: t('leads.form.errors.emailInvalid') })
                .max(200)
                .transform(value => value.trim().toLowerCase())
        ),
        source: z.enum(leadSourceValues, { message: t('leads.form.errors.sourceRequired') }),
        internalCampaignId: emptyToUndefined(z.string().min(1)),
        status: emptyToUndefined(z.enum(statusValues)),
        sellerId: emptyToUndefined(z.string().min(1)),
        companyId: emptyToUndefined(z.string().min(1)),
        disciplineId: emptyToUndefined(z.string().min(1)),
        secondaryPhoneCountryCode: emptyToUndefined(z.string().min(1).max(4)),
        secondaryPhoneNumber: emptyToUndefined(z.string().min(1).max(20)),
        gender: emptyToUndefined(z.enum(genderValues)),
        age: emptyToUndefined(z.enum(ageValues)),
        reason: emptyToUndefined(z.string().min(1)),
        eventSourceUrl: emptyToUndefined(z.string().min(1).max(500)),
        allowDuplicatePhone: stringToBoolean.default(false),
        allowDuplicateEmail: stringToBoolean.default(false)
    })
}

export function useUpdateLeadSchema() {
    const { t } = useTranslation()

    return updateLeadSchema(t)
}

export type UpdateLeadFormType = z.infer<ReturnType<typeof updateLeadSchema>>
