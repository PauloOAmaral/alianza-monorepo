import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogAction
} from '@alianza/ui/components/ui/alert-dialog'
import { useTranslation } from 'react-i18next'

type DialogActivateProps = {
    description: string
    isOpen: boolean
    activatePending: boolean
    handleActivate: () => void
    onOpenChange: (isOpen: boolean) => void
}

export function DialogActivate({ description, isOpen, activatePending, handleActivate, onOpenChange }: DialogActivateProps) {
    const { t } = useTranslation()

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('dialogs.activate.title')}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant='outline' size='sm'>
                        {t('logout.cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction isPending={activatePending} onClick={handleActivate}>
                        {t('tables.buttons.active')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
