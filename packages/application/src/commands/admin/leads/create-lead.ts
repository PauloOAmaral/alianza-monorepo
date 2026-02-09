import { createMainDbClient } from '@alianza/database/clients/main'
import { eq, isNull, sql } from '@alianza/database/drizzle'
import { dataContracts, leads } from '@alianza/database/schemas/admin'
import { z } from 'zod'
import { createAction } from '../../../action-builder'

const createLeadSchema = z.object({
    name: z.string().min(1).max(200),
    primaryPhoneCountryCode: z.string().optional().nullable(),
    primaryPhoneNumber: z.string().min(1).max(20),
    email: z.string().email().max(200).optional().nullable(),
    leadSource: z.number().int().min(0).max(16),
    internalCampaignId: z.string().optional().nullable(),
    status: z
        .enum([
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
        ])
        .optional()
        .nullable(),
    sellerId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    disciplineId: z.string().optional().nullable(),
    secondaryPhoneCountryCode: z.string().optional().nullable(),
    secondaryPhoneNumber: z.string().optional().nullable(),
    gender: z.enum(['unknown', 'masculine', 'feminine']).optional().nullable(),
    age: z
        .enum(['under_12', 'from_12_to_18', 'from_18_to_22', 'from_22_to_28', 'from_28_to_40', 'from_40_to_65', 'older_65'])
        .optional()
        .nullable(),
    reason: z.string().optional().nullable(),
    eventSourceUrl: z.string().optional().nullable(),
    allowDuplicatePhone: z.boolean().optional().default(false),
    allowDuplicateEmail: z.boolean().optional().default(false)
})

type DuplicateInfo = {
    leadId?: string
    source: 'lead' | 'student'
}

type CreateLeadResult =
    | {
          status: 'created'
          leadId: string
      }
    | {
          status: 'duplicate'
          duplicate: {
              phone?: DuplicateInfo
              email?: DuplicateInfo
          }
      }

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
    .build(async ({ data }): Promise<CreateLeadResult> => {
        const db = createMainDbClient()

        const phoneNormalized = normalizePhone(data.primaryPhoneNumber)
        const primaryCountryCode = normalizeCountryCode(data.primaryPhoneCountryCode)
        const secondaryCountryCode = normalizeCountryCode(data.secondaryPhoneCountryCode)
        const emailNormalized = normalizeEmail(data.email)

        const [duplicateLeadByPhone, duplicateLeadByEmail] = await Promise.all([
            phoneNormalized
                ? db._query.leads.findFirst({
                      columns: {
                          id: true
                      },
                      where: (table, { and }) => and(isNull(table.deletedAt), eq(table.primaryPhoneNumber, phoneNormalized))
                  })
                : null,
            emailNormalized
                ? db._query.leads.findFirst({
                      columns: {
                          id: true
                      },
                      where: table =>
                          sql`(${table.deletedAt} is null) and (lower(${table.email}) = ${emailNormalized})`
                  })
                : null
        ])

        const [duplicateStudentByPhone, duplicateStudentByEmail] = await Promise.all([
            phoneNormalized
                ? db._query.dataContracts.findFirst({
                      columns: {
                          id: true
                      },
                      where: (table, { and }) => and(isNull(table.deletedAt), eq(table.primaryPhoneNumber, phoneNormalized))
                  })
                : null,
            emailNormalized
                ? db._query.dataContracts.findFirst({
                      columns: {
                          id: true
                      },
                      where: table =>
                          sql`(${table.deletedAt} is null) and (lower(${table.email}) = ${emailNormalized})`
                  })
                : null
        ])

        const duplicate: { phone?: DuplicateInfo; email?: DuplicateInfo } = {}

        if (duplicateLeadByPhone) {
            duplicate.phone = { leadId: duplicateLeadByPhone.id, source: 'lead' }
        } else if (duplicateStudentByPhone) {
            duplicate.phone = { source: 'student' }
        }

        if (duplicateLeadByEmail) {
            duplicate.email = { leadId: duplicateLeadByEmail.id, source: 'lead' }
        } else if (duplicateStudentByEmail) {
            duplicate.email = { source: 'student' }
        }

        const hasPhoneDuplicate = Boolean(duplicate.phone)
        const hasEmailDuplicate = Boolean(duplicate.email)

        if ((hasPhoneDuplicate && !data.allowDuplicatePhone) || (hasEmailDuplicate && !data.allowDuplicateEmail)) {
            return {
                status: 'duplicate',
                duplicate
            }
        }

        const [created] = await db
            .insert(leads)
            .values({
                name: data.name.trim(),
                email: emailNormalized,
                primaryPhoneCountryCode: primaryCountryCode,
                primaryPhoneNumber: phoneNormalized || null,
                status: data.status ?? 'created',
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

        return {
            status: 'created',
            leadId: created?.id ?? ''
        }
    })

export type CreateLeadCommandResult = Awaited<ReturnType<typeof createLeadCommand>>['data']
