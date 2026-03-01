import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Await, useLoaderData } from 'react-router'
import type { loader } from '~/routes/sellers'
import { SellersTablePagination } from './sellers-table-pagination'
import { DataTableStatusCell } from '~/components/data-table/data-table-status-cell'
import { SellersTableAction } from './sellers-table-action'

export function getSellerDisplayName(seller: {
    userContext?: {
        user?: {
            userProfile?: { firstName?: string | null; lastName?: string | null; fullName?: string }
        }
    }
}): string {
    const profile = seller.userContext?.user?.userProfile

    if (!profile) return '-'

    const fullName = (profile as { fullName?: string }).fullName

    if (fullName?.trim()) return fullName.trim()

    const first = profile.firstName ?? ''
    const last = profile.lastName ?? ''

    return `${first} ${last}`.trim() || '-'
}

export function SellersTable() {
    const { t } = useTranslation()

    const sellersResult = useLoaderData<Awaited<ReturnType<typeof loader>>>()

    const emptyLabel = t('tablePages.sellers.empty', { defaultValue: 'Nenhum vendedor encontrado.' })

    return (
        <Suspense fallback={<SellersTableSkeleton />}>
            <Await resolve={sellersResult.data}>
                {sellers => (
                    <>
                        <Table>
                            <TableHeader className='bg-muted'>
                                <TableRow>
                                    <SellersGridColumns />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sellers.length === 0 ? (
                                    <TableRow>
                                        <TableCell className='h-24 text-center' colSpan={5}>
                                            {emptyLabel}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sellers.map(seller => (
                                        <TableRow key={seller.id}>
                                            <TableCell className='font-medium'>{getSellerDisplayName(seller)}</TableCell>
                                            <TableCell className='font-medium'>{seller.referralCode}</TableCell>
                                            <TableCell className='font-medium'>{seller.leadPrefix}</TableCell>
                                            <DataTableStatusCell isActive={seller.isActive} />
                                            <TableCell className='w-[100px]'>
                                                <SellersTableAction seller={seller} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {sellersResult.totalPages > 1 && <SellersTablePagination loaderDataResult={sellersResult} />}
                    </>
                )}
            </Await>
        </Suspense>
    )
}

const SellersGridColumns = () => {
    const { t } = useTranslation()

    return (
        <>
            <TableHead>{t('tablePages.sellers.headers.user')}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.referralCode')}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.leadPrefix')}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.status')}</TableHead>
            <TableHead className='w-[100px]' />
        </>
    )
}

export function SellersTableSkeleton() {
    const items = Array.from({ length: 5 }, (_, i) => i)

    return (
        <Table>
            <TableHeader>
                <SellersGridColumns />
            </TableHeader>
            <TableBody>
                {items.map(item => (
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
