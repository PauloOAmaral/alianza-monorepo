import { useEffect } from "react"
import { useFetcher } from "react-router"
import type { loader as loaderAddress } from "../routes/resources.places.$id/route"

interface UseAddressResolutionProps {
    address: Partial<{
        externalId: string | null
        addressLine1: string
        addressLine2: string
        suburb: string
        city: string
        state: string
        postalCode: string
        country: string
    }>
}

/**
 * Resolves an address using the Places resource when `externalId` is present.
 * When `externalId` is missing, it returns the provided address as-is.
 * @param param0 {
 *     address: {
 *         externalId: string
 *         addressLine1: string
 *         addressLine2: string
 *         suburb: string
 *         city: string
 *         state: string
 *         postalCode: string
 *         country: string
 *     }
 * }
 */
export function useAddressResolution({ address }: UseAddressResolutionProps) {
    const { load: fetcherLoad, data: fetcherData } = useFetcher<typeof loaderAddress>()

    useEffect(() => {
        if (address.externalId) {
            fetcherLoad(`/resources/places/${address.externalId}`)
        }
    }, [address.externalId, fetcherLoad])

    if (address.externalId && fetcherData?.data) {
        return {
            externalId: fetcherData.data.id,
            addressLine1: fetcherData.data.address_line_1,
            addressLine2: fetcherData.data.address_line_2,
            suburb: fetcherData.data.suburb,
            city: fetcherData.data.city,
            state: fetcherData.data.state,
            postalCode: fetcherData.data.postal_code,
            country: fetcherData.data.country_code,
        }
    }

    return address
}
