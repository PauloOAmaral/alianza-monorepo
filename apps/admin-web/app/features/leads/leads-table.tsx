import { Badge } from '@alianza/ui/components/ui/badge'
import { Button } from '@alianza/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@alianza/ui/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@alianza/ui/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type LeadRow = {
    id: string
    name: string
    email: string | null
    primaryPhoneCountryCode: string | null
    primaryPhoneNumber: string | null
    status: string
    leadSource: number | null
    internalCampaignId: string | null
    sellerId: string | null
    companyId: string | null
    disciplineId: string | null
    secondaryPhoneCountryCode: string | null
    secondaryPhoneNumber: string | null
    gender: string | null
    age: string | null
    reason: string | null
    eventSourceUrl: string | null
}

export function LeadsTable({ leads, onEdit }: { leads: LeadRow[]; onEdit: (lead: LeadRow) => void }) {
    const { t } = useTranslation()

    const idLabel = t('leads.table.id')
    const nameLabel = t('leads.table.name')
    const phoneLabel = t('leads.table.phone')
    const emailLabel = t('leads.table.email')
    const sellerLabel = t('leads.table.seller')
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
                        <TableHead>{sellerLabel}</TableHead>
                        <TableHead>{statusLabel}</TableHead>
                        <TableHead className='w-[140px]'>{actionsLabel}</TableHead>
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
                                <TableCell className='font-medium'>{lead.id}</TableCell>
                                <TableCell className='font-medium'>{lead.name}</TableCell>
                                <TableCell className='font-medium'>{lead.primaryPhoneNumber ?? '-'}</TableCell>
                                <TableCell className='font-medium'>{lead.email ?? '-'}</TableCell>
                                <TableCell className='font-medium'>{lead.sellerId ?? '-'}</TableCell>
                                <TableCell>
                                    <Badge variant='secondary'>{t(`leads.status.${lead.status}`, { defaultValue: lead.status })}</Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size='icon' variant='ghost'>
                                                <MoreHorizontal className='size-4' />
                                                <span className='sr-only'>{actionsLabel}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem onClick={() => onEdit(lead)}>{t('tables.buttons.edit')}</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
