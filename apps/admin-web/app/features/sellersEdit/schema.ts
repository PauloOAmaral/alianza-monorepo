import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const stringToBoolean = z.preprocess(
    (value) => (typeof value === 'string' ? value === 'true' : value),
    z.boolean()
)

export function updateSellerSchema(t: TFunction) {
    return z.object({
        sellerId: z.string().min(1),
        referralCode: z
            .string()
            .min(1, { message: t('fields.sellers.referralCode.required', { defaultValue: 'Código é obrigatório.' }) })
            .max(10),
        leadPrefix: z
            .string()
            .min(1, { message: t('fields.sellers.leadPrefix.required', { defaultValue: 'Prefixo é obrigatório.' }) })
            .max(2),
        dailyToSell: z.preprocess(
            (v) => (v === '' || v === undefined ? undefined : Number(v)),
            z.number().min(0).optional().nullable()
        ),
        dailyExperimentalClass: z.preprocess(
            (v) => (v === '' || v === undefined ? undefined : Number(v)),
            z.number().int().min(0).optional().nullable()
        ),
        pixelId: z.string().max(500).transform((s) => s?.trim() || null).optional().nullable(),
        pixelSecret: z.string().max(500).transform((s) => s?.trim() || null).optional().nullable(),
        isActive: stringToBoolean
    })
}

export function useUpdateSellerSchema() {
    const { t } = useTranslation()
    return updateSellerSchema(t)
}

export type UpdateSellerFormInputType = z.input<ReturnType<typeof updateSellerSchema>>
export type UpdateSellerFormOutputType = z.output<ReturnType<typeof updateSellerSchema>>
