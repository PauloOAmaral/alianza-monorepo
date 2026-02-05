import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { useTranslation } from 'react-i18next'

export type LeadRow = {
    id: string
    name: string
    email: string | null
    primaryPhoneNumber: string | null
}

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
    const { t } = useTranslation()

    const idLabel = t('leads.table.id')
    const nameLabel = t('leads.table.name')
    const phoneLabel = t('leads.table.phone')
    const emailLabel = t('leads.table.email')
    const statusLabel = t('leads.table.status')
    const actionsLabel = t('leads.table.actions')
    const emptyLabel = t('leads.table.empty')

    return (
        <div className='overflow-hidden rounded-lg border'>
            <Table>
                <TableHeader className='bg-muted'>
                    <TableRow>
                        <TableHead>{idLabel}</TableHead>
                        <TableHead>{nameLabel}</TableHead>
                        <TableHead>{phoneLabel}</TableHead>
                        <TableHead>{emailLabel}</TableHead>
                        <TableHead>{statusLabel}</TableHead>
                        <TableHead className='w-[140px]'>{actionsLabel}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.length === 0 ? (
                        <TableRow>
                            <TableCell className='h-24 text-center' colSpan={6}>
                                {emptyLabel}
                            </TableCell>
                        </TableRow>
                    ) : (
                        leads.map(lead => (
                            <TableRow key={lead.id}>
                                <TableCell className='font-medium'>{lead.id}</TableCell>
                                <TableCell className='font-medium'>{lead.name}</TableCell>
                                <TableCell className='font-medium'>{lead.primaryPhoneNumber ?? '-'}</TableCell>
                                <TableCell className='font-medium'>{lead.email ?? '-'}</TableCell>
                                <TableCell className='text-muted-foreground'>-</TableCell>
                                <TableCell className='text-muted-foreground'>-</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
