import { getUsersGridQuery } from '@alianza/application/queries/admin'
import { createRequest } from '~/utils/server/request-builder'
import { usersSearchParamsLoader } from './route-params'

export async function getUsersGrid(request: Request) {
    const { query, page, limit } = usersSearchParamsLoader(request)

    const {
        data: { data, count }
    } = await getUsersGridQuery(createRequest(request, { query, page, limit }))

    const totalPages = Math.max(1, Math.ceil(count / limit))

    return { data, count, page, limit, totalPages }
}
