import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils'
import { Slot } from './utils'

interface PaginationProps {
    page: number
    limit: number
    total?: number
    previousPageLabel?: string
    nextPageLabel?: string
    className?: string
    children: ({ page, pageRender, currentPage }: { page: number; pageRender: React.ReactNode; currentPage?: 'page' }) => React.ReactNode
}

const Pagination = ({ page, limit, total, previousPageLabel, nextPageLabel, className, children }: PaginationProps) => {
    const totalPages = Math.ceil((total || 0) / limit)

    if (totalPages <= 1) {
        return null
    }

    const visiblePages = getVisiblePages(page, totalPages)

    return (
        <nav aria-label='pagination' className={cn('mt-4 flex items-center justify-center', className)}>
            <ul className='flex items-center justify-center gap-2'>
                <PreviousPageButton page={page} previousPageLabel={previousPageLabel} totalPages={totalPages}>
                    {children}
                </PreviousPageButton>
                <PageNumbers currentPage={page} visiblePages={visiblePages}>
                    {children}
                </PageNumbers>
                <NextPageButton nextPageLabel={nextPageLabel} page={page} totalPages={totalPages}>
                    {children}
                </NextPageButton>
            </ul>
        </nav>
    )
}

Pagination.displayName = 'Pagination'

const getVisiblePages = (page: number, totalPages: number): (number | 'ellipsis-start' | 'ellipsis-end')[] => {
    const delta = 2
    const range: (number | 'ellipsis-start' | 'ellipsis-end')[] = [1]

    let start = Math.max(2, page - delta)
    let end = Math.min(totalPages - 1, page + delta)

    if (end - start < 2 * delta) {
        start = Math.max(2, end - 2 * delta)
        end = Math.min(totalPages - 1, start + 2 * delta)
    }

    if (start > 2) {
        range.push('ellipsis-start')
    } else if (start === 2) {
        range.push(2)
    }

    for (let i = start + 1; i < end; i++) {
        if (!range.includes(i)) {
            range.push(i)
        }
    }

    if (end < totalPages - 1) {
        range.push('ellipsis-end')
    } else if (end === totalPages - 1 && !range.includes(end)) {
        range.push(end)
    }

    if (totalPages > 1 && !range.includes(totalPages)) {
        range.push(totalPages)
    }

    return range
}

const PreviousPageButton = ({ page, previousPageLabel, children }: { page: number; totalPages: number; previousPageLabel?: string; children: PaginationProps['children'] }) => {
    return (
        <li className={cn('[&>a]:p-2 [&>a]:w-fit [&>a]:h-fit [&>a]:block [&>a]:rounded-md', page === 1 && 'opacity-70 [&>a]:pointer-events-none')}>
            <Slot aria-disabled={page === 1}>
                {children({
                    page: Math.max(1, page - 1),
                    pageRender: (
                        <>
                            <ChevronLeft aria-hidden className='h-4 w-4' />
                            {previousPageLabel ? (
                                <span aria-hidden className='sr-only'>
                                    {previousPageLabel}
                                </span>
                            ) : null}
                        </>
                    ),
                    currentPage: page === 1 ? 'page' : undefined
                })}
            </Slot>
        </li>
    )
}

const NextPageButton = ({ page, totalPages, nextPageLabel, children }: { page: number; totalPages: number; nextPageLabel?: string; children: PaginationProps['children'] }) => {
    return (
        <li className={cn('[&>a]:p-2 [&>a]:w-fit [&>a]:h-fit [&>a]:block [&>a]:rounded-md', page === totalPages && 'opacity-70 [&>a]:pointer-events-none')}>
            <Slot aria-disabled={page === totalPages}>
                {children({
                    page: Math.min(totalPages, page + 1),
                    pageRender: (
                        <>
                            <ChevronRight aria-hidden className='h-4 w-4' />
                            {nextPageLabel ? (
                                <span aria-hidden className='sr-only'>
                                    {nextPageLabel}
                                </span>
                            ) : null}
                        </>
                    ),
                    currentPage: page === totalPages ? 'page' : undefined
                })}
            </Slot>
        </li>
    )
}

const PageNumbers = ({ visiblePages, currentPage, children }: { visiblePages: (number | 'ellipsis-start' | 'ellipsis-end')[]; currentPage: number; children: PaginationProps['children'] }) => {
    return (
        <>
            {visiblePages.map(item => {
                if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                    return (
                        <li className='px-2' key={item}>
                            <span aria-hidden className='text-muted-foreground'>
                                ...
                            </span>
                        </li>
                    )
                }

                const pageNumber = item as number
                return (
                    <li className={cn('[&>a]:p-2 [&>a]:rounded-md', pageNumber === currentPage && '[&>a]:bg-muted', pageNumber === currentPage && '[&>a]:text-muted-foreground')} key={pageNumber}>
                        {children({
                            page: pageNumber,
                            pageRender: pageNumber,
                            currentPage: pageNumber === currentPage ? 'page' : undefined
                        })}
                    </li>
                )
            })}
        </>
    )
}

export { Pagination }
