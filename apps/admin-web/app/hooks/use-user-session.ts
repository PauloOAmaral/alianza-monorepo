import { useRouteLoaderData } from 'react-router'
import type { loader } from '~/routes/_app/route'

/**
 * Hook to get the user session from the layout route
 * Please make sure you expose the session in the route loader data ("routes/_app")
 * @returns user session
 */
export function useUserSession() {
    const data = useRouteLoaderData<typeof loader>('routes/_app')

    if (!data?.session) {
        throw new Error('User session not found from (routes/_app) route')
    }

    return data.session
}
