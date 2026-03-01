import { Button } from '@alianza/ui/components/ui/button'
import { Trans, useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router'
import { UsersTable } from '~/features/users/users-table'
import { getUsersGrid } from '~/features/users/loader-server'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/users'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/users' to='/users'>
            <Trans i18nKey='formPages.users.title' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Usuários | Alianza' }, { name: 'description', content: 'Lista de usuários do sistema' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    requireSession(request)

    return getUsersGrid(request)
}

export default function UsersRoute() {
    const { t } = useTranslation()

    return (
        <div className='flex flex-1 flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <Button asChild>
                    <Link to='/users/new'>{t('formPages.users.newUser')}</Link>
                </Button>
            </div>

            <UsersTable />
            <Outlet />
        </div>
    )
}
