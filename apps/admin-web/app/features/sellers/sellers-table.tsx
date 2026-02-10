import { Badge } from '@alianza/ui/components/ui/badge'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useSearchParams } from 'react-router'
import { DataTablePagination } from '~/components/data-table/pagination'
import type { loader } from '~/routes/sellers'

function getSellerDisplayName(seller: {
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
    const [searchParams] = useSearchParams()
    const gridResult = useLoaderData<Awaited<ReturnType<typeof loader>>>()

    const serialize = (page: number) => {
        const next = new URLSearchParams(searchParams)
        next.set('page', String(page))
        return `/sellers?${next.toString()}`
    }

    const data = gridResult.data
    const emptyLabel = t('tablePages.sellers.empty', { defaultValue: 'Nenhum vendedor encontrado.' })

    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader className='bg-muted'>
                    <TableRow>
                        <SellersGridColumns />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell className='h-24 text-center' colSpan={5}>
                                {emptyLabel}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map(seller => (
                            <TableRow key={seller.id}>
                                <TableCell className='font-medium'>{getSellerDisplayName(seller)}</TableCell>
                                <TableCell className='font-medium'>{seller.referralCode}</TableCell>
                                <TableCell className='font-medium'>{seller.leadPrefix}</TableCell>
                                <TableCell>
                                    <Badge variant={seller.isActive ? 'default' : 'secondary'}>
                                        {seller.isActive ? t('tables.headers.active', { defaultValue: 'Ativo' }) : t('tables.headers.inactive', { defaultValue: 'Inativo' })}
                                    </Badge>
                                </TableCell>
                                <TableCell className='w-[100px]' />
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {gridResult.totalPages > 1 && <DataTablePagination count={gridResult.count} limit={gridResult.limit} page={gridResult.page} serialize={serialize} />}
        </div>
    )
}

const SellersGridColumns = () => {
    const { t } = useTranslation()

    return (
        <>
            <TableHead>{t('tablePages.sellers.headers.user', { defaultValue: 'Usuário' })}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.referralCode', { defaultValue: 'Código' })}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.leadPrefix', { defaultValue: 'Prefixo' })}</TableHead>
            <TableHead>{t('tablePages.sellers.headers.status', { defaultValue: 'Status' })}</TableHead>
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
