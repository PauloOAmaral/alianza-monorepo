import { Badge } from '@alianza/ui/components/ui/badge'
import { Button } from '@alianza/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@alianza/ui/components/ui/dropdown-menu'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Await, useLoaderData, useNavigate } from 'react-router'
import type { loader } from '~/routes/users'
import { UsersTablePagination } from './users-table-pagination'

function getUserDisplayName(row: { userProfile?: { firstName?: string | null; lastName?: string | null } | null }): string {
    const p = row.userProfile

    if (!p) return '-'

    const first = p.firstName ?? ''
    const last = p.lastName ?? ''

    return `${first} ${last}`.trim() || '-'
}

export function UsersTable() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const usersResult = useLoaderData<Awaited<ReturnType<typeof loader>>>()

    const emptyLabel = t('tablePages.users.empty')

    const handleEdit = (userId: string) => {
        navigate(`/users/${userId}/edit`)
    }

    return (
        <Suspense fallback={<UsersTableSkeleton />}>
            <Await resolve={usersResult.data}>
                {users => (
                    <>
                        <Table>
                            <TableHeader className='bg-muted'>
                                <TableRow>
                                    <UsersGridColumns />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell className='h-24 text-center' colSpan={4}>
                                            {emptyLabel}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell className='font-medium'>{getUserDisplayName(row)}</TableCell>
                                            <TableCell className='font-medium'>{row.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={row.emailConfirmed ? 'default' : 'secondary'}>
                                                    {row.emailConfirmed ? t('tablePages.users.emailConfirmed') : t('tablePages.users.emailNotConfirmed')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='w-[100px]'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size='icon' variant='ghost'>
                                                            <MoreHorizontal className='size-4' />
                                                            <span className='sr-only'>{t('tablePages.users.headers.actions')}</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align='end'>
                                                        <DropdownMenuItem onClick={() => handleEdit(row.id)}>{t('tables.buttons.edit')}</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {usersResult.totalPages > 1 && <UsersTablePagination loaderDataResult={usersResult} />}
                    </>
                )}
            </Await>
        </Suspense>
    )
}

const UsersGridColumns = () => {
    const { t } = useTranslation()

    return (
        <>
            <TableHead>{t('tablePages.users.headers.name')}</TableHead>
            <TableHead>{t('tablePages.users.headers.email')}</TableHead>
            <TableHead>{t('tablePages.users.headers.emailConfirmed')}</TableHead>
            <TableHead className='w-[100px]' />
        </>
    )
}

export function UsersTableSkeleton() {
    const items = Array.from({ length: 5 }, (_, i) => i)

    return (
        <Table>
            <TableHeader>
                <UsersGridColumns />
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
                            <Skeleton className='h-6 w-6 rounded-full' />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
