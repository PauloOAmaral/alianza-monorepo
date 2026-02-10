import { createSerializer, useQueryStates } from 'nuqs'
import { DataTablePagination } from '~/components/data-table/pagination'
import { collectorsSearchParams } from './route-params'
import type { loader } from '~/routes/collectors'

interface CollectorsTablePaginationProps {
    loaderDataResult?: Awaited<ReturnType<typeof loader>> 
}

export function CollectorsTablePagination({ loaderDataResult }: CollectorsTablePaginationProps) {
    const [filter] = useQueryStates(collectorsSearchParams, { shallow: false })

    const serialize = createSerializer(collectorsSearchParams)

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
