import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Await, useLoaderData } from 'react-router'
import type { loader } from '~/routes/collectors'
import { CollectorsTablePagination } from './collectors-table-pagination'
import { DataTableStatusCell } from '~/components/data-table/data-table-status-cell'

function formatDailyToCharge(value: string | null | undefined): string {
    if (value == null || value === '') return '-'
    const n = Number(value)
    if (Number.isNaN(n)) return '-'
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function CollectorsTable() {
    const { t } = useTranslation()

    const collectorsResult = useLoaderData<Awaited<ReturnType<typeof loader>>>()

    const emptyLabel = t('tablePages.collectors.empty', { defaultValue: 'Nenhum cobrador encontrado.' })

    return (
        <Suspense fallback={<CollectorsTableSkeleton />}>
            <Await resolve={collectorsResult.data}>
                {(collectors) => (
                    <>
                        <Table>
                            <TableHeader className='bg-muted'>
                                <TableRow>
                                    <CollectorsGridColumns />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {collectors.length === 0 ? (
                                    <TableRow>
                                        <TableCell className='h-24 text-center' colSpan={4}>
                                            {emptyLabel}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    collectors.map((collector) => (
                                        <TableRow key={collector.id}>
                                            <TableCell className='font-medium'>{collector.userAdminId}</TableCell>
                                            <TableCell className='font-medium'>
                                                {formatDailyToCharge(collector.dailyToCharge)}
                                            </TableCell>
                                            <DataTableStatusCell isActive={collector.isActive} />
                                            <TableCell className='w-[100px]' />
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {collectorsResult.totalPages > 1 && (
                            <CollectorsTablePagination loaderDataResult={collectorsResult} />
                        )}
                    </>
                )}
            </Await>
        </Suspense>
    )
}

const CollectorsGridColumns = () => {
    const { t } = useTranslation()

    return (
        <>
            <TableHead>{t('tablePages.collectors.headers.userAdminId')}</TableHead>
            <TableHead>{t('tablePages.collectors.headers.dailyToCharge')}</TableHead>
            <TableHead>{t('tablePages.collectors.headers.status')}</TableHead>
            <TableHead className='w-[100px]' />
        </>
    )
}

export function CollectorsTableSkeleton() {
    const items = Array.from({ length: 5 }, (_, i) => i)

    return (
        <Table>
            <TableHeader>
                <CollectorsGridColumns />
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item}>
                        <TableCell>
                            <Skeleton className='h-6 w-full' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='h-6 w-full' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='h-6 w-full' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='h-6 w-6 rounded-full' />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
