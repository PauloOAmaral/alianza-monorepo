import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { z } from "zod"

export function useLoginSchema() {
    const { t } = useTranslation()

    return loginSchema(t)
}

export function loginSchema(t: TFunction) {
    return z.object({
        "cf-turnstile-response": z.string({ error: t("fields.auth.verification.required") }),
        intent: z.literal("login"),
        email: z
            .email({ message: t("fields.auth.email.invalid") })
            .max(255, { message: t("fields.auth.email.maxLength") })
            .trim()
            .toLowerCase(),
    })
}

export type LoginType = z.infer<ReturnType<typeof useLoginSchema>>

export function useLoginWithPasswordSchema() {
    const { t } = useTranslation()

    return loginWithPasswordSchema(t)
}

export function loginWithPasswordSchema(t: TFunction) {
    return z.object({
        "cf-turnstile-response": z.string().optional(),
        intent: z.literal("login-with-password"),
        email: z
            .email({ message: t("fields.auth.email.invalid") })
            .max(255, { message: t("fields.auth.email.maxLength") })
            .trim()
            .toLowerCase(),
        password: z
            .string({ error: t("fields.auth.password.required") })
            .min(6, { message: t("fields.auth.password.minLength") })
            .max(100, { message: t("fields.auth.password.maxLength") })
            .trim(),
    })
}

export type LoginWithPasswordType = z.infer<ReturnType<typeof useLoginWithPasswordSchema>>
