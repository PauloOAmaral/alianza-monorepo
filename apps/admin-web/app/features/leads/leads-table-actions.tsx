import { Button } from "@alianza/ui/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@alianza/ui/components/ui/dropdown-menu";
import { TableCell } from "@alianza/ui/components/ui/table";
import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";
import type { loader } from "~/routes/leads";
import { useNavigate } from "react-router";

type LoaderData = Awaited<ReturnType<typeof loader>>
type ResolvedData = Awaited<LoaderData['data']>
type Lead = ResolvedData[number]

interface LeadsTableActionsProps {
    lead: Lead
}


export function LeadsTableActions({ lead }: LeadsTableActionsProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleEdit = (leadId: string) => {
        navigate(`/leads/${leadId}/edit`)
    }

    return (
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
    )
}