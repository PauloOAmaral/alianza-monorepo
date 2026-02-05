import { getLeadsGridQuery } from '@alianza/application/queries/admin'
import { Button } from '@alianza/ui/components/ui/button'
import { Trans } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { LeadsTable } from '~/features/leads/leads-table'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/leads'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/leads' to='/leads'>
            <Trans i18nKey='titles.leads' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Leads | Alianza' }, { name: 'description', content: 'Leads list' }]
}

function parsePositiveInt(value: string | null, fallback: number, max?: number) {
    const parsed = Number(value)
    if (!Number.isFinite(parsed) || parsed <= 0) return fallback
    const normalized = Math.floor(parsed)
    return typeof max === 'number' ? Math.min(normalized, max) : normalized
}

export async function loader({ request }: Route.LoaderArgs) {
    await requireSession(request)

    const url = new URL(request.url)

    const page = parsePositiveInt(url.searchParams.get('page'), 1)
    const limit = parsePositiveInt(url.searchParams.get('limit'), 20, 1000)

    const { data } = await getLeadsGridQuery({ data: { page, limit } })

    return {
        leads: data.data,
        count: data.count,
        page,
        limit
    }
}

export default function ({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation()
    const { leads, count, page, limit } = loaderData
    const totalPages = Math.max(1, Math.ceil(count / limit))
    const start = count === 0 ? 0 : (page - 1) * limit + 1
    const end = Math.min(page * limit, count)

    const buildPageUrl = (targetPage: number) => {
        const params = new URLSearchParams()
        params.set('page', String(targetPage))
        params.set('limit', String(limit))
        return `?${params.toString()}`
    }

    return (
        <div className='flex flex-1 flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold'>{t('leads.page.title')}</h1>
                    <p className='text-muted-foreground text-sm'>
                        {t('leads.page.summary', { start, end, count })}
                    </p>
                </div>
            </div>

            <LeadsTable leads={leads} />

            <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-muted-foreground text-sm'>
                    {t('leads.page.pageOf', { page, total: totalPages })}
                </p>
                <div className='flex items-center gap-2'>
                    {page > 1 ? (
                        <Button asChild variant='outline'>
                            <Link to={buildPageUrl(page - 1)}>{t('pagination.previousPage')}</Link>
                        </Button>
                    ) : (
                        <Button disabled variant='outline'>
                            {t('pagination.previousPage')}
                        </Button>
                    )}
                    {page < totalPages ? (
                        <Button asChild variant='outline'>
                            <Link to={buildPageUrl(page + 1)}>{t('pagination.nextPage')}</Link>
                        </Button>
                    ) : (
                        <Button disabled variant='outline'>
                            {t('pagination.nextPage')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
