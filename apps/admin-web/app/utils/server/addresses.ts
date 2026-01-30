import { getPlace } from "@alianza/services/google/places"

export async function parseFormAddress<
    T extends {
        externalId?: string | null
        addressLine1?: string
        addressLine2?: string
        suburb?: string
        city?: string
        state?: string
        country?: string
        postalCode?: string
    },
>(data: T | undefined) {
    if (!data) {
        return
    }

    const address: {
        externalId?: string
        addressLine1?: string
        addressLine2?: string
        suburb?: string
        city?: string
        state?: string
        country: string
        postalCode?: string
        latitude?: string
        longitude?: string
    } = {
        country: "",
    }

    if (data.externalId) {
        const addressFromExternalProvider = await getPlace({
            name: data.externalId,
        }).catch((_) => {
            return null
        })

        if (
            !addressFromExternalProvider ||
            !addressFromExternalProvider.id ||
            !addressFromExternalProvider.country_code
        ) {
            return
        }

        address.externalId = addressFromExternalProvider.id
        address.addressLine1 = addressFromExternalProvider.address_line_1
        address.addressLine2 = addressFromExternalProvider.address_line_2
        address.suburb = addressFromExternalProvider.suburb
        address.city = addressFromExternalProvider.city
        address.state = addressFromExternalProvider.state
        address.country = addressFromExternalProvider.country_code
        address.postalCode = addressFromExternalProvider.postal_code
        address.latitude = addressFromExternalProvider.latitude
        address.longitude = addressFromExternalProvider.longitude
    } else {
        if (!data.country) {
            return
        }

        address.addressLine1 = data.addressLine1
        address.addressLine2 = data.addressLine2
        address.suburb = data.suburb
        address.city = data.city
        address.state = data.state
        address.country = data.country
        address.postalCode = data.postalCode
    }

    return address
}
