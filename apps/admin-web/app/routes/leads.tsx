import { getInternalCampaignOptionsQuery, getLeadsGridQuery, getPhoneCountriesQuery } from '@alianza/application/queries/admin'
import { Button } from '@alianza/ui/components/ui/button'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
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
            <Trans i18nKey='formPages.leads.title' />
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

    const [{ data }] = await Promise.all([
        getLeadsGridQuery({ data: { page, limit } })
    ])

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

    const [selectedLead, setSelectedLead] = useState<(typeof leads)[number] | null>(null)

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
                    <h1 className='text-xl font-semibold'>{t('formPages.leads.title')}</h1>
                    <p className='text-muted-foreground text-sm'>{t('tables.summary', { start, end, count })}</p>
                </div>

                <Button asChild>
                    <Link to='/leads/new'>{t('formPages.leads.newLead')}</Link>
                </Button>
            </div>

            <LeadsTable
                leads={leads}
                onEdit={lead => {
                    setSelectedLead(lead)
                }}
            />

            <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-muted-foreground text-sm'>{t('tables.pageOf', { page, total: totalPages })}</p>
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
