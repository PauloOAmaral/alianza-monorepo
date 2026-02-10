import { Button } from '@alianza/ui/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

interface DataTablePaginationProps {
    page: number
    totalPages: number
    buildPageUrl: (page: number) => string
}

export function DataTablePagination({ page, totalPages, buildPageUrl }: DataTablePaginationProps) {
    const { t } = useTranslation()

    return (
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <p className='text-muted-foreground text-sm'>{t('tables.pageOf', { page, total: totalPages })}</p>
            <div className='flex items-center gap-2'>
                {page > 1 ? (
                    <Button asChild variant='outline'>
                        <Link to={buildPageUrl(page - 1)}>{t('pagination.previousPage')}</Link>
                    </Button>
                ) : (
                    <Button disabled variant='outline'>
                        {t('pagination.previousPage')}
                    </Button>
                )}
                {page < totalPages ? (
                    <Button asChild variant='outline'>
                        <Link to={buildPageUrl(page + 1)}>{t('pagination.nextPage')}</Link>
                    </Button>
                ) : (
                    <Button disabled variant='outline'>
                        {t('pagination.nextPage')}
                    </Button>
                )}
            </div>
        </div>
    )
}
