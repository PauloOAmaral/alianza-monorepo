import type { i18n } from "i18next"
import { createInstance } from "i18next"
import { createCookie } from "react-router"
import { i18nextConfig } from "~/localization/i18next-config"
import { ENV } from "~/utils/env"

/* ────────────────────────────────────────────── */
/* Cookie */
/* ────────────────────────────────────────────── */

const cookie = createCookie(ENV.I18NEXT_COOKIE_NAME, {
    path: "/",
    sameSite: "lax",
    secure: ENV.NODE_ENV === "production",
    httpOnly: true,
})

/* ────────────────────────────────────────────── */
/* Utils */
/* ────────────────────────────────────────────── */

function pickSupported(value: string | null): string {
    const supported = i18nextConfig.supportedLngs as string[]
    const fallback = i18nextConfig.fallbackLng as string

    if (!value) return fallback
    if (supported.includes(value)) return value

    const loose = supported.find(
        (l) => value.startsWith(l) || l.startsWith(value),
    )

    return loose ?? fallback
}

/* ────────────────────────────────────────────── */
/* Locale detection (REQUEST-BASED) */
/* ────────────────────────────────────────────── */

export async function getLocale(request: Request): Promise<string> {
    const url = new URL(request.url)

    const fromSearch = url.searchParams.get("lng")
    if (fromSearch) return pickSupported(fromSearch)

    const fromCookie = await cookie.parse(request.headers.get("Cookie"))
    if (typeof fromCookie === "string" && fromCookie) {
        return pickSupported(fromCookie)
    }

    const acceptLanguage = request.headers.get("Accept-Language")
    if (acceptLanguage) {
        const first = acceptLanguage
            .split(",")[0]
            ?.trim()
            .split("-")[0]
        if (first) return pickSupported(first)
    }

    return i18nextConfig.fallbackLng as string
}

/* ────────────────────────────────────────────── */
/* i18n instance (REQUEST-BASED) */
/* ────────────────────────────────────────────── */

export async function getI18nextServerInstance(
    request: Request,
): Promise<i18n> {
    const lng = await getLocale(request)
    const instance = createInstance(i18nextConfig)
    await instance.init({ lng })
    return instance
}

/* ────────────────────────────────────────────── */
/* Cookie serialization */
/* ────────────────────────────────────────────── */

export async function serializeLocaleCookie(
    request: Request,
): Promise<string> {
    const locale = await getLocale(request)
    return cookie.serialize(locale)
}
