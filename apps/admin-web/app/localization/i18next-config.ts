import { formatDate, formatDistance, isDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import i18next, { type InitOptions, type Resource } from "i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import { pt } from "../localization/pt"

const resources: Resource = {
    pt: {
        translation: pt,
    },
}

const interpolationFormat = (value: string, format: string | undefined) => {
    if (
        (typeof value === "string" || typeof value === "number") &&
        format?.startsWith("duration")
    ) {
        const totalSeconds = typeof value === "string" ? Number.parseFloat(value) : value

        if (Number.isNaN(totalSeconds)) {
            return value
        }

        const totalMinutes = totalSeconds / 60
        const totalHours = totalMinutes / 60
        const totalDays = totalHours / 24

        let displayValue: number
        let unit: string

        if (totalSeconds < 60) {
            displayValue = Math.round(totalSeconds)
            unit = format === "durationLong" ? (displayValue === 1 ? "second" : "seconds") : "s"
        } else if (totalMinutes < 60) {
            displayValue = Math.round(totalMinutes)
            unit = format === "durationLong" ? (displayValue === 1 ? "minute" : "minutes") : "min"
        } else if (totalHours < 24) {
            displayValue = Math.round(totalHours * 10) / 10
            unit = format === "durationLong" ? (displayValue === 1 ? "hour" : "hours") : "h"
        } else {
            displayValue = Math.round(totalDays * 10) / 10
            unit = format === "durationLong" ? (displayValue === 1 ? "day" : "days") : "d"
        }

        const formattedValue =
            displayValue % 1 === 0 ? Math.floor(displayValue).toString() : displayValue.toString()

        return `${formattedValue} ${unit}`
    }

    if (isDate(value)) {
        if (!format) {
            return value
        }

        if (format === "short") {
            return formatDate(value, "P", { locale: ptBR })
        }

        if (format === "long") {
            return formatDate(value, "PPPP", { locale: ptBR })
        }

        if (format === "ago") {
            return formatDistance(value, new Date(), {
                locale: ptBR,
                addSuffix: true,
            })
        }

        return formatDate(value, format, { locale: ptBR })
    }

    return value
}

function createI18nextConfig() {
    const supportedLanguages = Object.keys(resources)
    if (supportedLanguages.length === 0) {
        throw new Error("Resources must contain at least one language")
    }

    const fallbackLanguage = supportedLanguages[0]

    if (!fallbackLanguage) {
        throw new Error("No languages found in resources")
    }

    const languageResource = resources[fallbackLanguage]

    if (!languageResource) {
        throw new Error(`Language resource not found for: ${fallbackLanguage}`)
    }

    const namespaces = Object.keys(languageResource)

    if (namespaces.length === 0) {
        throw new Error(`No namespaces found for language: ${fallbackLanguage}`)
    }

    const defaultNamespace = namespaces[0]

    if (!defaultNamespace) {
        throw new Error("No default namespace found")
    }

    return {
        resources,
        ns: namespaces,
        defaultNS: defaultNamespace,
        supportedLngs: supportedLanguages,
        fallbackLng: fallbackLanguage,
        interpolation: { escapeValue: false, format: interpolationFormat },
    } satisfies Omit<InitOptions, "detection">
}

export const i18nextConfig = createI18nextConfig()

export async function getI18nextClient() {
    await i18next
        .use(initReactI18next)
        .use(I18nextBrowserLanguageDetector)
        .init({
            detection: { order: ["htmlTag"], caches: [] },
            ...i18nextConfig,
        })

    return i18next
}

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            translation: typeof pt
        }
    }
}
