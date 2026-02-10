import { createMainDbClient } from '@alianza/database/clients/main'
import { eq, isNull } from '@alianza/database/drizzle'
import { leads } from '@alianza/database/schemas/admin'
import { ageValues, campaignSourceValues, genderValues, leadStatusValues } from '@alianza/database/types/enum'
import { z } from 'zod'
import { createAction } from '../../../action-builder'
import { ApplicationError } from '../../../error'

const updateLeadSchema = z.object({
    leadId: z.string().min(1),
    name: z.string().min(1).max(200).trim(),
    primaryPhoneCountryCode: z.string().min(1).max(4),
    primaryPhoneNumber: z.string().min(1).max(20),
    email: z.string().email().max(200).optional().nullable(),
    leadSource: z.enum(campaignSourceValues).optional().nullable(),
    internalCampaignId: z.string().optional().nullable(),
    status: z.enum(leadStatusValues).optional().nullable(),
    sellerId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    disciplineId: z.string().optional().nullable(),
    secondaryPhoneCountryCode: z.string().optional().nullable(),
    secondaryPhoneNumber: z.string().optional().nullable(),
    gender: z.enum(genderValues).optional().nullable(),
    age: z.enum(ageValues).optional().nullable(),
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

export const updateLeadCommand = createAction({ schema: updateLeadSchema })
    .withData()
    .build(async ({ data }) => {
        const db = createMainDbClient()

        const phoneNormalized = normalizePhone(data.primaryPhoneNumber)
        const primaryCountryCode = normalizeCountryCode(data.primaryPhoneCountryCode)
        const secondaryCountryCode = normalizeCountryCode(data.secondaryPhoneCountryCode)
        const emailNormalized = normalizeEmail(data.email)

        const existingLead = await db.query.leads.findFirst({
            columns: { id: true },
            where: (table, { and }) => and(isNull(table.deletedAt), eq(table.id, data.leadId))
        })

        if (!existingLead) {
            throw new ApplicationError('commonNotFound')
        }

        await db
            .update(leads)
            .set({
                name: data.name,
                email: emailNormalized,
                primaryPhoneNumber: phoneNormalized,
                primaryPhoneCountryCode: data.primaryPhoneCountryCode,
                leadSource: data.leadSource,
                internalCampaignId: data.internalCampaignId,
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
            .where(eq(leads.id, data.leadId))

        return { leadId: data.leadId }
    })

export type UpdateLeadCommandResult = Awaited<ReturnType<typeof updateLeadCommand>>['data']
