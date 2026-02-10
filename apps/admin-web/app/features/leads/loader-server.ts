import { getLeadsGridQuery } from '@alianza/application/queries/admin'
import { createRequest } from '~/utils/server/request-builder'
import { leadsSearchParamsLoader } from './route-params'

export async function getLeadsGrid(request: Request) {
    const { query, page, limit } = leadsSearchParamsLoader(request)

    const {
        data: { data, count }
    } = await getLeadsGridQuery(createRequest(request, { query, page, limit }))

    return { data, count }
}
