import { createSerializer, useQueryStates } from 'nuqs'
import { DataTablePagination } from '~/components/data-table/pagination'
import type { loader } from '~/routes/leads'
import { leadsSearchParams } from './route-params'

interface LeadsTablePaginationProps {
    loaderDataResult?: Awaited<Awaited<ReturnType<typeof loader>>['data']>
}

export function LeadsTablePagination({ loaderDataResult }: LeadsTablePaginationProps) {
    const [filter] = useQueryStates(leadsSearchParams, { shallow: false })

    const serialize = createSerializer(leadsSearchParams)

    const count = loaderDataResult?.count

    return <DataTablePagination count={count} limit={filter.limit} page={filter.page} serialize={page => serialize({ ...filter, page })} />
}
