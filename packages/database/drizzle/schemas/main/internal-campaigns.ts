import { index, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createdAt, deletedAt, id, isActive, updatedAt } from '../../utils/fields'

export const campaignSource = pgEnum('campaign_source', [
    'facebook', // Facebook = 0
    'messenger', // Messenger = 1
    'instagram', // Instagram = 2
    'direct', // Direct = 3
    'google', // Google = 4
    'tiktok', // TikTok = 5
    'youtube', // Youtube = 6
    'blog', // Blog = 7
    'email', // Email = 8
    'indication', // Indicação = 9
    'company', // Empresa = 10
    'affiliate', // Afiliado = 11 (C# typo: Afility)
    'influencer', // Influencer = 12
    'student_indication', // Indicação de Aluno = 13
    'fb_forms', // Formulários Facebook = 14
    'ex_student', // Ex-Aluno = 15
    'campaign' // Campanha = 16
])

export const internalCampaigns = pgTable(
    'internal_campaigns',
    {
        id,
        url: text('url'),
        name: varchar('name', { length: 200 }).notNull(),
        campaignContent: varchar('campaign_content', { length: 255 }),
        campaignId: varchar('campaign_id', { length: 255 }),
        campaignMedium: varchar('campaign_medium', { length: 255 }),
        campaignName: varchar('campaign_name', { length: 255 }),
        campaignTerm: varchar('campaign_term', { length: 255 }),
        campaignSource: campaignSource('campaign_source'),
        sellerId: varchar('seller_id', { length: 16 }).notNull(),
        isActive,
        createdAt,
        updatedAt,
        deletedAt
    },
    table => [index('internal_campaigns__seller_id_idx').on(table.sellerId)]
)
