import { ENV } from "~/utils/env"
import type {
    Address,
    AddressComponent,
    AddressComponentMapping,
    AutocompletePlacesRequest,
    AutocompleteResponse,
    AutocompleteResult,
    GetPlaceRequest,
    PlacePrediction,
    PlaceResponse,
    Suggestion,
} from "./places.types"
import { formatAddressLine } from "./places.utils"

function isValidSuggestion(
    suggestion: Suggestion,
): suggestion is Suggestion & { placePrediction: PlacePrediction } {
    return Boolean(suggestion.placePrediction?.placeId && suggestion.placePrediction?.text?.text)
}

export async function autocomplete(data: AutocompletePlacesRequest): Promise<AutocompleteResult[]> {
    const { input, regionCode, includedRegionCodes, languageCode } = data

    const url = "https://places.googleapis.com/v1/places:autocomplete"

    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY!,
    }

    const body: any = {
        input,
    }

    if (regionCode) {
        body.regionCode = regionCode
    }

    if (includedRegionCodes && includedRegionCodes.length > 0) {
        body.includedRegionCodes = includedRegionCodes
    }

    if (languageCode) {
        body.languageCode = languageCode
    }

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error(`Autocomplete API request failed with status ${response.status}`)
    }

    const result = (await response.json()) as AutocompleteResponse

    return (
        result.suggestions?.filter(isValidSuggestion).map((suggestion) => ({
            id: suggestion.placePrediction.placeId,
            place: suggestion.placePrediction.text.text,
        })) || []
    )
}

export async function getPlace(data: GetPlaceRequest): Promise<Address> {
    const { name, regionCode, languageCode } = data

    const params = new URLSearchParams()

    if (languageCode) {
        params.append("languageCode", languageCode)
    }

    if (regionCode) {
        params.append("regionCode", regionCode)
    }

    const queryString = params.size > 0 ? `?${params.toString()}` : ""

    const url = `https://places.googleapis.com/v1/places/${name}${queryString}`

    const headers = {
        "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY!,
        "X-Goog-FieldMask": "*",
    }

    const response = await fetch(url, {
        method: "GET",
        headers,
    })

    if (!response.ok) {
        throw new Error(`Get Place API request failed with status ${response.status}`)
    }

    const result = (await response.json()) as PlaceResponse

    if (!result) {
        throw new Error("No place data returned from Google Places API")
    }

    if (!result.addressComponents || !Array.isArray(result.addressComponents)) {
        throw new Error("No address components found in Google Places API response")
    }

    const address: Address = {
        id: result.id || undefined,
        country: undefined,
        country_code: undefined,
        state: undefined,
        state_code: undefined,
        postal_code: undefined,
        city: undefined,
        suburb: undefined,
        address_line_1: undefined,
        address_line_2: undefined,
        formatted_address: result.formattedAddress || undefined,
        latitude: result.location?.latitude?.toString() ?? undefined,
        longitude: result.location?.longitude?.toString() ?? undefined,
    }

    let streetNumber = ""
    let route = ""

    const addressComponentMap: Record<string, AddressComponentMapping> = {
        country: {
            types: ["country"],
            setter: (component: AddressComponent) => {
                address.country = component.longText
                address.country_code = component.shortText
            },
        },
        state: {
            types: ["administrative_area_level_1"],
            setter: (component: AddressComponent) => {
                address.state = component.longText
                address.state_code = component.shortText
            },
        },
        postal_code: {
            types: ["postal_code"],
            setter: (component: AddressComponent) => {
                address.postal_code = component.longText
            },
        },
        city: {
            types: ["administrative_area_level_2", "locality", "postal_town"],
            setter: (component: AddressComponent) => {
                address.city = address.city || component.longText
            },
        },
        suburb: {
            types: ["sublocality", "sublocality_level_1", "neighborhood"],
            setter: (component: AddressComponent) => {
                address.suburb = address.suburb || component.longText
            },
        },
        route: {
            types: ["route"],
            setter: (component: AddressComponent) => {
                route = component.longText
            },
        },
        street_number: {
            types: ["street_number"],
            setter: (component: AddressComponent) => {
                streetNumber = component.longText
            },
        },
    }

    for (const component of result.addressComponents) {
        const types = component.types || []

        for (const [_, mapping] of Object.entries(addressComponentMap)) {
            if (mapping.types.some((type) => types.includes(type))) {
                mapping.setter(component)
                break
            }
        }
    }

    address.address_line_1 = formatAddressLine(streetNumber, route, address.country_code)

    return address
}
