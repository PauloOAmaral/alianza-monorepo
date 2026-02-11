import { leadStatusOptions } from '@alianza/application/utils/enums/age'
import type { LeadStatus } from '@alianza/database/types/enum'
import { Badge } from '@alianza/ui/components/ui/badge'
import { TableCell } from '@alianza/ui/components/ui/table'
import { useTranslation } from 'react-i18next'

export function DataTableLeadStatus({ status }: { status: LeadStatus }) {
    const { t } = useTranslation()

    const getLeadStatusColor = (status: LeadStatus) => {
        switch (status) {
            case 'pre_analisys':
                return 'bg-red-100'
            case 'created':
                return 'bg-blue-100'
            case 'in_service':
                return 'bg-green-100'
            case 'experimental_class':
                return 'bg-yellow-100'
            case 'experimental_class_missed':
                return 'bg-purple-100'
            case 'feedback':
                return 'bg-pink-100'
            case 'contract':
                return 'bg-orange-100'
            case 'waiting_payment':
                return 'bg-brown-100'
            case 'paid':
                return 'bg-green-100'
            case 'talk_later':
                return 'bg-gray-100'
            case 'disqualified':
                return 'bg-red-100'
            default:
                return 'bg-gray-100'
        }
    }

    const leadStatus = leadStatusOptions.find(option => option.id === status)

    if (!leadStatus) return null

    return (
        <TableCell>
            <Badge className={getLeadStatusColor(status)}>{(t as (key: string) => string)(leadStatus.translateKey)}</Badge>
        </TableCell>
    )
}
