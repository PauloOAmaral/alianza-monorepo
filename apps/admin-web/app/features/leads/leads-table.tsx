import { Badge } from '@alianza/ui/components/ui/badge'
import { Button } from '@alianza/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@alianza/ui/components/ui/dropdown-menu'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Await, useLoaderData, useNavigate } from 'react-router'
import type { loader } from '~/routes/leads'
import { LeadsTablePagination } from './leads-table-pagination'

export function LeadsTable() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const leadsGridResult = useLoaderData<Awaited<ReturnType<typeof loader>>>()
    const emptyLabel = t('tablePages.leads.empty')

    const handleEdit = (leadId: string) => {
        navigate(`/leads/${leadId}/edit`)
    }

    return (
        <Suspense fallback={<LeadsTableSkeleton />}>
            <Await resolve={leadsGridResult.data}>
                {leads => (
                    <>
                        <Table>
                            <TableHeader className='bg-muted'>
                                <TableRow>
                                    <LeadsGridColumns />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell className='h-24 text-center' colSpan={7}>
                                            {emptyLabel}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map(lead => (
                                        <TableRow key={lead.id}>
                                            <TableCell>{lead.id}</TableCell>
                                            <TableCell>{lead.name}</TableCell>
                                            <TableCell>{lead.primaryPhoneNumber ?? '-'}</TableCell>
                                            <TableCell>{lead.email ?? '-'}</TableCell>
                                            <TableCell>{lead.seller?.userContext?.user?.userProfile?.fullName ?? '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant='secondary'>{t(`leads.status.${lead.status}`, { defaultValue: lead.status })}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size='icon' variant='ghost'>
                                                            <MoreHorizontal className='size-4' />
                                                            <span className='sr-only'>{t('tablePages.leads.headers.actions')}</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align='end'>
                                                        <DropdownMenuItem onClick={() => handleEdit(lead.id)}>{t('tables.buttons.edit')}</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {leadsGridResult.totalPages > 1 && <LeadsTablePagination loaderDataResult={leadsGridResult} />}
                    </>
                )}
            </Await>
        </Suspense>
    )
}

const LeadsGridColumns = () => {
    const { t } = useTranslation()

    return (
        <>
            <TableHead>{t('tablePages.leads.headers.id')}</TableHead>
            <TableHead>{t('tablePages.leads.headers.name')}</TableHead>
            <TableHead>{t('tablePages.leads.headers.phone')}</TableHead>
            <TableHead>{t('tablePages.leads.headers.email')}</TableHead>
            <TableHead>{t('tablePages.leads.headers.seller')}</TableHead>
            <TableHead>{t('tablePages.leads.headers.status')}</TableHead>
            <TableHead className='w-[140px]' />
        </>
    )
}

function LeadsTableSkeleton() {
    const items = Array.from({ length: 5 }, (_, i) => i)

    return (
        <Table>
            <TableHeader>
                <LeadsGridColumns />
            </TableHeader>
            <TableBody>
                {items.map(item => (
                    <TableRow key={item}>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-full h-6' />
                        </TableCell>
                        <TableCell>
                            <Skeleton className='w-6 h-6 rounded-full' />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
