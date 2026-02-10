import { createSerializer, useQueryStates } from 'nuqs'
import { DataTablePagination } from '~/components/data-table/pagination'
import { sellersSearchParams } from './route-params'
import type { loader } from '~/routes/sellers'

interface SellersTablePaginationProps {
    loaderDataResult?: Awaited<Awaited<ReturnType<typeof loader>>>
}

export function SellersTablePagination({ loaderDataResult }: SellersTablePaginationProps) {
    const [filter] = useQueryStates(sellersSearchParams, { shallow: false })

    const serialize = createSerializer(sellersSearchParams)

    const count = loaderDataResult?.count

    return (
        <DataTablePagination count={count} limit={filter.limit} page={filter.page} serialize={page => serialize({ ...filter, page })} />
    )
}