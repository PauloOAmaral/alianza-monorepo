// Countries that use "road house_number" format (street name first, then number)
export const roadFirstCountries = [
    "AF",
    "AI",
    "AL",
    "AO",
    "AR",
    "AT",
    "AW",
    "AX",
    "BA",
    "BE",
    "BG",
    "BI",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BT",
    "BV",
    "BW",
    "CF",
    "CH",
    "CL",
    "CM",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DO",
    "EC",
    "EE",
    "EH",
    "ER",
    "ET",
    "FI",
    "FO",
    "GD",
    "GE",
    "GL",
    "GQ",
    "GR",
    "GT",
    "GW",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IL",
    "IR",
    "IS",
    "JO",
    "KI",
    "KM",
    "KP",
    "LC",
    "LI",
    "LR",
    "LT",
    "LV",
    "LY",
    "ME",
    "MK",
    "ML",
    "MN",
    "MO",
    "MX",
    "NI",
    "NL",
    "NO",
    "NP",
    "PA",
    "PE",
    "PL",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "SB",
    "SD",
    "SE",
    "SI",
    "SJ",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SZ",
    "TD",
    "TJ",
    "TL",
    "TR",
    "UY",
    "UZ",
    "VC",
    "VE",
    "VU",
    "WS",
]

// Countries that use "Street Name, Number" format (road first with comma)
export const roadFirstCommaCountries = ["ES", "IT", "SM", "VA"]

// Countries that use "Number, Street Name" format (number first with comma)
export const numberFirstCommaCountries = [
    "BJ",
    "BN",
    "BY",
    "CD",
    "CG",
    "IN",
    "KG",
    "KZ",
    "LA",
    "MD",
    "MR",
    "MU",
    "MZ",
    "SY",
    "TG",
    "TM",
    "UA",
    "VN",
    "YE",
]

/**
 * Formats street address based on country-specific conventions
 * @param streetNumber The house/building number
 * @param route The street/road name
 * @param countryCode The ISO country code
 * @returns Formatted address line
 */
export function formatAddressLine(
    streetNumber: string,
    route: string,
    countryCode?: string,
): string {
    if (!streetNumber || !route) {
        return route || streetNumber || ""
    }

    if (!countryCode) {
        // Default format: "Number Street Name"
        return `${streetNumber} ${route}`
    }

    if (roadFirstCountries.includes(countryCode)) {
        // Format: "Street Name Number" (e.g., "Rua das Flores 123")
        return `${route} ${streetNumber}`
    }
    if (roadFirstCommaCountries.includes(countryCode)) {
        // Format: "Street Name, Number" (e.g., "Calle Mayor, 123")
        return `${route}, ${streetNumber}`
    }

    if (numberFirstCommaCountries.includes(countryCode)) {
        // Format: "Number, Street Name" (e.g., "123, Main Street")
        return `${streetNumber}, ${route}`
    }

    // Default format: "Number Street Name" (e.g., "123 Main Street")
    return `${streetNumber} ${route}`
}
