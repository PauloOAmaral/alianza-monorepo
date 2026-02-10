import { getCollectorsGridQuery } from '@alianza/application/queries/admin'
import { createRequest } from '~/utils/server/request-builder'
import { collectorsSearchParamsLoader } from './route-params'

export async function getCollectorsGrid(request: Request) {
    const { query, page, limit } = collectorsSearchParamsLoader(request)

    const {
        data: { data, count }
    } = await getCollectorsGridQuery(createRequest(request, { query, page, limit }))

    const totalPages = Math.max(1, Math.ceil(count / limit))

    return { data, count, page, limit, totalPages }
}
