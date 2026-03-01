import { boolean, char, foreignKey, index, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, updatedAt } from '../../utils/fields'
import { gender as genderEnum } from '../common'
import { disciplines } from './disciplines'
import { campaignSource, internalCampaigns } from './internal-campaigns'
import { sellers } from './sellers'

export const leadStatus = pgEnum('lead_status', [
    'pre_analisys', // Pré-Análise
    'created', // Cadastrado
    'in_service', // Em Atendimento
    'experimental_class', // Aula Experimental
    'experimental_class_missed', // Reagendar
    'feedback', // Feedback
    'contract', // Assinatura do Contrato
    'waiting_payment', // Aguardando Pagamento
    'paid', // Matriculado
    'talk_later', // Falar Depois
    'disqualified' // Desqualificado
])

export const disqualifiedType = pgEnum('disqualified_type', [
    'profile_invalid', // Fora do Perfil = 0
    'phone_number_replicate', // Número Repetido = 1
    'phone_number_non_existent', // Número Inexistente = 2
    'student_not_answer' // Aluno Desapareceu = 3
])

export const age = pgEnum('age', [
    'under_12', // 12-
    'from_12_to_18', // 12 - 18
    'from_18_to_22', // 18 - 22
    'from_22_to_28', // 22 - 28
    'from_28_to_40', // 28 - 40
    'from_40_to_65', // 40 - 65
    'older_65' // 65+
])

export const leadRescheduleReason = pgEnum('lead_reschedule_reason', [
    'lead_not_confirmed_experimental_class', // Lead não confirmou a aula experimental = 1
    'requested_reschedule_due_to_unforeseen' // Solicitou reagendamento devido a um imprevisto = 2
])

export const leads = pgTable(
    'leads',
    {
        id,
        sellerId: varchar('seller_id', { length: 16 }),
        companyId: varchar('company_id', { length: 16 }),
        disciplineId: varchar('discipline_id', { length: 16 }),
        internalCampaignId: varchar('internal_campaign_id', { length: 16 }),
        name: varchar('name', { length: 200 }).notNull(),
        email: varchar('email', { length: 200 }),
        primaryPhoneCountryCode: char('primary_phone_country_code', { length: 4 }).notNull(),
        primaryPhoneNumber: char('primary_phone_number', { length: 20 }).notNull(),
        secondaryPhoneCountryCode: char('secondary_phone_country_code', { length: 4 }),
        secondaryPhoneNumber: char('secondary_phone_number', { length: 20 }),
        status: leadStatus('status').notNull(),
        gender: genderEnum('gender'),
        reason: text('reason'),
        isActiveFrom: boolean('is_active_from').notNull(),
        disqualifiedType: disqualifiedType('disqualified_type'),
        age: age('age'),
        clickId: varchar('click_id', { length: 255 }),
        eventSourceUrl: text('event_source_url'),
        fbc: varchar('fbc', { length: 255 }),
        fbp: varchar('fbp', { length: 255 }),
        fbLeadsForm: varchar('fb_leads_form', { length: 255 }),
        leadSource: campaignSource('lead_source'),
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [
        index('leads__company_id_idx').on(table.companyId),
        index('leads__discipline_id_idx').on(table.disciplineId),
        index('leads__internal_campaign_id_idx').on(table.internalCampaignId),
        index('leads_deleted_at_idx').on(table.deletedAt),
        index('leads__seller_id_idx').on(table.sellerId),
        index('leads__full_idx').on(table.name, table.email, table.primaryPhoneNumber, table.primaryPhoneCountryCode),
        foreignKey({
            columns: [table.disciplineId],
            foreignColumns: [disciplines.id],
            name: 'leads__discipline_id_fkey'
        }),
        foreignKey({
            columns: [table.internalCampaignId],
            foreignColumns: [internalCampaigns.id],
            name: 'leads__internal_campaign_id_fkey'
        }),
        foreignKey({
            columns: [table.sellerId],
            foreignColumns: [sellers.id],
            name: 'leads__seller_id_fkey'
        })
    ]
)
