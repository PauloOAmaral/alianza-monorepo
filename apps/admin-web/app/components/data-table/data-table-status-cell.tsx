import { Badge } from '@alianza/ui/components/ui/badge'
import { TableCell } from '@alianza/ui/components/ui/table'
import { useTranslation } from 'react-i18next'

export function DataTableStatusCell({ isActive }: { isActive: boolean }) {
    const { t } = useTranslation()

    return (
        <TableCell>
            <Badge variant={isActive ? 'success' : 'error'}>{isActive ? t('tables.headers.active') : t('tables.headers.inactive')}</Badge>
        </TableCell>
    )
}
