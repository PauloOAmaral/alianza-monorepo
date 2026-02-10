import type { TFunction } from 'i18next'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function createSellerSchema(t: TFunction) {
    return z.object({
        userContextId: z
            .string()
            .min(1, { message: t('fields.sellers.userContext.required', { defaultValue: 'Selecione um usuário.' }) })
    })
}

export function useCreateSellerSchema() {
    const { t } = useTranslation()
    return createSellerSchema(t)
}

export type CreateSellerFormInputType = z.input<ReturnType<typeof createSellerSchema>>
export type CreateSellerFormOutputType = z.output<ReturnType<typeof createSellerSchema>>
