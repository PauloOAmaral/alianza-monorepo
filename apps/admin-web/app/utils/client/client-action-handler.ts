import { type ClientActionFunctionArgs, isRouteErrorResponse } from 'react-router'

export async function clientActionHandler({ serverAction }: ClientActionFunctionArgs) {
    try {
        await serverAction()
    } catch (error) {
        // ignore errors explicitly handled by routes or redirects
        if (isRouteErrorResponse(error) || (error as any)?.status === 302) {
            throw error
        }
    }
}
