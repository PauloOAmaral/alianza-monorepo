import { createMainDbClient } from '@alianza/database/clients/main'
import { eq, isNull, sql } from '@alianza/database/drizzle'
import { dataContracts, leads } from '@alianza/database/schemas/admin'
import { ageValues, campaignSourceValues, genderValues, leadStatusValues } from '@alianza/database/types/enum'
import { z } from 'zod'
import { ApplicationError } from '~/error'
import { createAction } from '../../../action-builder'

const createLeadSchema = z.object({
    name: z.string().min(1).max(200),
    primaryPhoneCountryCode: z.string().min(1).max(4),
    primaryPhoneNumber: z.string().min(1).max(20),
    email: z.string().email().max(200).optional().nullable(),
    internalCampaignId: z.string().optional().nullable(),
    leadSource: z.enum(campaignSourceValues).optional().nullable(),
    status: z.enum(leadStatusValues).optional().nullable(),
    gender: z.enum(genderValues).optional().nullable(),
    age: z.enum(ageValues).optional().nullable(),
    sellerId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    disciplineId: z.string().optional().nullable(),
    secondaryPhoneCountryCode: z.string().optional().nullable(),
    secondaryPhoneNumber: z.string().optional().nullable(),
    reason: z.string().optional().nullable(),
    eventSourceUrl: z.string().optional().nullable(),
    allowDuplicatePhone: z.boolean().optional().default(false),
    allowDuplicateEmail: z.boolean().optional().default(false)
})

function normalizePhone(value: string) {
    return value.replace(/\D+/g, '')
}

function normalizeCountryCode(value?: string | null) {
    if (!value) return null
    const normalized = value.replace(/\D+/g, '')
    const trimmed = normalized.replace(/^0+/, '')
    return trimmed.length > 0 ? trimmed : null
}

function normalizeEmail(value?: string | null) {
    if (!value) return null
    return value.trim().toLowerCase()
}

export const createLeadCommand = createAction({ schema: createLeadSchema })
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const phoneNormalized = normalizePhone(data.primaryPhoneNumber)
        const secondaryCountryCode = normalizeCountryCode(data.secondaryPhoneCountryCode)
        const emailNormalized = normalizeEmail(data.email)

        const [created] = await db
            .insert(leads)
            .values({
                name: data.name,
                email: emailNormalized,
                primaryPhoneCountryCode: data.primaryPhoneCountryCode,
                primaryPhoneNumber: phoneNormalized,
                status: 'created',
                isActiveFrom: true,
                leadSource: data.leadSource,
                internalCampaignId: data.internalCampaignId ?? null,
                sellerId: data.sellerId ?? null,
                companyId: data.companyId ?? null,
                disciplineId: data.disciplineId ?? null,
                secondaryPhoneCountryCode: secondaryCountryCode,
                secondaryPhoneNumber: data.secondaryPhoneNumber ?? null,
                gender: data.gender ?? null,
                age: data.age ?? null,
                reason: data.reason ?? null,
                eventSourceUrl: data.eventSourceUrl ?? null
            })
            .returning({ id: leads.id })

        if (!created) {
            throw new ApplicationError('unexpectedError')
        }

        return {
            leadId: created.id
        }
    })

export type CreateLeadCommandResult = Awaited<ReturnType<typeof createLeadCommand>>['data']
