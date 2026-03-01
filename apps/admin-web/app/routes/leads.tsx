import { Button } from '@alianza/ui/components/ui/button'
import { Trans, useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router'
import { LeadsTable } from '~/features/leads/leads-table'
import { getLeadsGrid } from '~/features/leads/loader-server'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/leads'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/leads' to='/leads'>
            <Trans i18nKey='formPages.leads.title' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Leads | Alianza' }, { name: 'description', content: 'Leads list' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    requireSession(request)

    const gridResult = getLeadsGrid(request)

    return gridResult
}

export default function () {
    const { t } = useTranslation()

    return (
        <div className='flex flex-1 flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <Button asChild>
                    <Link to='/leads/new'>{t('formPages.leads.newLead')}</Link>
                </Button>
            </div>

            <LeadsTable />
            <Outlet />
        </div>
    )
}
