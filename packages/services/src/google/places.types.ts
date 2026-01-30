export interface PlacePrediction {
    placeId: string
    text: {
        text: string
    }
}

export interface Suggestion {
    placePrediction?: PlacePrediction
}

export interface AutocompleteResponse {
    suggestions?: Suggestion[]
}

export interface AutocompletePlacesRequest {
    input: string
    regionCode?: string
    includedRegionCodes?: string[]
    languageCode?: string
}

export interface AutocompleteResult {
    id: string
    place: string
}

export interface AddressComponent {
    longText: string
    shortText: string
    types: string[]
}

export interface PlaceLocation {
    latitude?: number
    longitude?: number
}

export interface PlaceResponse {
    id?: string
    formattedAddress?: string
    location?: PlaceLocation
    addressComponents?: AddressComponent[]
}

export interface GetPlaceRequest {
    name: string
    regionCode?: string
    languageCode?: string
}

export interface Address {
    id?: string
    country?: string
    country_code?: string
    state?: string
    state_code?: string
    postal_code?: string
    city?: string
    suburb?: string
    address_line_1?: string
    address_line_2?: string
    formatted_address?: string
    latitude?: string
    longitude?: string
}

export interface AddressComponentMapping {
    types: string[]
    setter: (component: AddressComponent) => void
}
