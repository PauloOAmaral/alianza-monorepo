import type { TFunction } from 'i18next'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function createSellerSchema(t: TFunction) {
    return z.object({
        userContextId: z.string().min(1, { message: t('fields.sellers.userContext.required', { defaultValue: 'Selecione um usuário.' }) }),
        referralCode: z.string().min(1).max(10).optional(),
        leadPrefix: z.string().min(1).max(2).optional(),
        dailyToSell: z.preprocess(v => (v === '' || v === undefined ? undefined : Number(v)), z.number().min(0).optional().nullable()),
        dailyExperimentalClass: z.preprocess(v => (v === '' || v === undefined ? undefined : Number(v)), z.number().int().min(0).optional().nullable()),
        pixelId: z
            .string()
            .max(500)
            .transform(s => s?.trim() || null)
            .optional()
            .nullable(),
        pixelSecret: z
            .string()
            .max(500)
            .transform(s => s?.trim() || null)
            .optional()
            .nullable()
    })
}

export function useCreateSellerSchema() {
    const { t } = useTranslation()
    return createSellerSchema(t)
}

export type CreateSellerFormInputType = z.input<ReturnType<typeof createSellerSchema>>
export type CreateSellerFormOutputType = z.output<ReturnType<typeof createSellerSchema>>
