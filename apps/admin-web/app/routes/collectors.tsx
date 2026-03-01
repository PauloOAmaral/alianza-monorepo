import { Trans, useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router'
import { getCollectorsGrid } from '~/features/collectors/loader-server'
import { CollectorsTable } from '~/features/collectors/collectors-table'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/collectors'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/collectors' to='/collectors'>
            <Trans i18nKey='formPages.collectors.title' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Cobradores | Alianza' }, { name: 'description', content: 'Lista de cobradores' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    requireSession(request)

    return getCollectorsGrid(request)
}

export default function CollectorsRoute() {
    return (
        <div className='flex flex-1 flex-col gap-4'>
            <CollectorsTable />
            <Outlet />
        </div>
    )
}
