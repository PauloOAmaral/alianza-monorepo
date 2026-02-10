import { Button } from '@alianza/ui/components/ui/button'
import { Trans, useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router'

import { getSellersGrid } from '~/features/sellers/loader-server'
import { SellersTable } from '~/features/sellers/sellers-table'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/sellers'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/sellers' to='/sellers'>
            <Trans i18nKey='formPages.sellers.title' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Vendedores | Alianza' }, { name: 'description', content: 'Lista de vendedores' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    requireSession(request)

    return getSellersGrid(request)
}

export default function SellersRoute() {
    const { t } = useTranslation()

    return (
        <div className='flex flex-1 flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <Button asChild>
                    <Link to='/sellers/new'>{t('formPages.sellers.newSeller', { defaultValue: 'Novo vendedor' })}</Link>
                </Button>
            </div>

            <SellersTable />
            <Outlet />
        </div>
    )
}
