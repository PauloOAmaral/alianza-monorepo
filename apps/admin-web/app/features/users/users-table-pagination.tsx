import { createSerializer, useQueryStates } from 'nuqs'
import { DataTablePagination } from '~/components/data-table/pagination'
import { usersSearchParams } from './route-params'
import type { loader } from '~/routes/users'

interface UsersTablePaginationProps {
    loaderDataResult?: Awaited<ReturnType<typeof loader>>
}

export function UsersTablePagination({ loaderDataResult }: UsersTablePaginationProps) {
    const [filter] = useQueryStates(usersSearchParams, { shallow: false })

    const serialize = createSerializer(usersSearchParams)

    const count = loaderDataResult?.count

    return (
        <DataTablePagination
            count={count}
            limit={filter.limit}
            page={filter.page}
            serialize={(page) => serialize({ ...filter, page })}
        />
    )
}
