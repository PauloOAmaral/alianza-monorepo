import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@alianza/ui/components/ui/alert-dialog"
import { useTranslation } from "react-i18next"

type DialogInactivateProps = {
    description: string
    isOpen: boolean
    inactivatePending: boolean
    handleInactivate: () => void
    onOpenChange: (isOpen: boolean) => void
}

export function DialogInactivate({ description, isOpen, inactivatePending, handleInactivate, onOpenChange }: DialogInactivateProps) {
    const { t } = useTranslation()

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("dialogs.deactivate.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant='outline' size='sm'>{t('logout.cancel')}</AlertDialogCancel>
                    <AlertDialogAction isPending={inactivatePending} onClick={handleInactivate}>
                        {t('tables.buttons.inactive')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}