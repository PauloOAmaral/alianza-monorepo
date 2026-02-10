import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function updateUserSchema(t: TFunction) {
    return z.object({
        userId: z.string().min(1),
        email: z
            .string()
            .min(1, { message: t('fields.users.email.required') })
            .email({ message: t('fields.users.email.invalid') })
            .max(255)
            .transform((v) => v.trim().toLowerCase()),
        firstName: z.string().max(50).optional().nullable(),
        lastName: z.string().max(100).optional().nullable()
    })
}

export function useUpdateUserSchema() {
    const { t } = useTranslation()
    return updateUserSchema(t)
}

export type UpdateUserFormInputType = z.input<ReturnType<typeof updateUserSchema>>
export type UpdateUserFormOutputType = z.output<ReturnType<typeof updateUserSchema>>
