import { Pagination } from '@alianza/ui/components/pagination'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

interface DataTablePaginationProps {
    limit: number
    page: number
    count?: number
    serialize: (page: number) => string
}

export function DataTablePagination({ page, limit, count = 0, serialize }: DataTablePaginationProps) {
    const { t } = useTranslation()
    const start = count === 0 ? 0 : (page - 1) * limit + 1
    const end = Math.min(page * limit, count)

    return (
        <div className='flex flex-wrap items-center justify-between gap-2'>

            <div className='flex flex-col gap-1'>
                <p className='text-muted-foreground text-sm'>{t('tables.summary', { start, end, count })}</p>
            </div>
            <Pagination
                limit={limit}
                nextPageLabel={t("pagination.nextPage")}
                page={page}
                previousPageLabel={t("pagination.previousPage")}
                total={count}
            >
                {({ page, pageRender, currentPage }) => (
                    <Link aria-current={currentPage} prefetch="intent" to={serialize(page)}>
                        {pageRender}
                    </Link>
                )}
            </Pagination>
        </div>
    )
}
