import { logout } from '@alianza/application/auth/admin'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@alianza/ui/alert-dialog'
import { useTranslation } from 'react-i18next'
import { href, redirect, useFetcher, useNavigate } from 'react-router'
import { removeSession, requireSession } from '~/middleware/session-middleware'
import { createRequest } from '~/utils/server/request-builder'
import type { Route } from './+types/logout'

export async function action({ request }: Route.ActionArgs) {
    const userSession = await requireSession(request)

    // Removes the session from the database
    await logout(createRequest(request, { sessionId: userSession.id }))

    // Removes the session from the cookie
    const headers = await removeSession(request)

    throw redirect(href('/login'), { headers })
}

export default function LogoutRoute() {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const logoutFetcher = useFetcher<typeof action>()

    const isPending = logoutFetcher.state !== 'idle'

    return (
        <AlertDialog onOpenChange={open => !open && navigate(-1)} open>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('logout.dialogTitle')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('logout.dialogDescription')}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => navigate(-1)} size='default' type='button' variant='outline'>
                        {t('logout.cancel')}
                    </AlertDialogCancel>
                    <logoutFetcher.Form method='POST'>
                        <AlertDialogAction disabled={isPending} isPending={isPending} size='default' type='submit' variant='default'>
                            {t('logout.confirm')}
                        </AlertDialogAction>
                    </logoutFetcher.Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
