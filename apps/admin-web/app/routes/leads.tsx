import { getInternalCampaignOptionsQuery, getLeadsGridQuery, getPhoneCountriesQuery } from '@alianza/application/queries/admin'
import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { ScrollArea } from '@alianza/ui/components/ui/scroll-area'
import { Separator } from '@alianza/ui/components/ui/separator'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, NavLink, useRevalidator } from 'react-router'
import { LeadEditForm } from '~/features/leads/lead-edit-form'
import { LeadForm } from '~/features/leads/lead-form'
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

function normalizeCountryCode(value?: string | null) {
    if (!value) return null

    const normalized = value.replace(/\D+/g, '')
    const trimmed = normalized.replace(/^0+/, '')

    return trimmed.length > 0 ? trimmed : null
}

export async function loader({ request }: Route.LoaderArgs) {
    await requireSession(request)

    const url = new URL(request.url)

    const page = parsePositiveInt(url.searchParams.get('page'), 1)
    const limit = parsePositiveInt(url.searchParams.get('limit'), 20, 1000)

    const [{ data }, { data: campaignsData }, { data: countriesData }] = await Promise.all([
        getLeadsGridQuery({ data: { page, limit } }),
        getInternalCampaignOptionsQuery({ data: { includeInactive: false } }),
        getPhoneCountriesQuery({ data: {} })
    ])

    return {
        leads: data.data,
        count: data.count,
        page,
        limit,
        campaigns: campaignsData.campaigns,
        phoneCountries: countriesData.countries
    }
}

export default function ({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation()

    const { leads, count, page, limit, campaigns, phoneCountries } = loaderData

    const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
    const [isEditLeadOpen, setIsEditLeadOpen] = useState(false)

    const [selectedLead, setSelectedLead] = useState<(typeof leads)[number] | null>(null)

    const revalidator = useRevalidator()
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
                    <p className='text-muted-foreground text-sm'>{t('leads.page.summary', { start, end, count })}</p>
                </div>

                <Button onClick={() => setIsNewLeadOpen(true)}>{t('leads.page.newLead')}</Button>
            </div>

            <LeadsTable
                leads={leads}
                onEdit={lead => {
                    setSelectedLead(lead)
                    setIsEditLeadOpen(true)
                }}
            />

            <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-muted-foreground text-sm'>{t('leads.page.pageOf', { page, total: totalPages })}</p>
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

            <Dialog onOpenChange={setIsNewLeadOpen} open={isNewLeadOpen}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>{t('leads.form.title')}</DialogTitle>
                        <DialogDescription>{t('leads.form.description')}</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <ScrollArea className='max-h-[70vh] pr-4'>
                        <LeadForm
                            action='/leads/new'
                            campaigns={campaigns}
                            onSuccess={() => {
                                setIsNewLeadOpen(false)
                                revalidator.revalidate()
                            }}
                            phoneCountries={phoneCountries}
                        />
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Dialog
                onOpenChange={open => {
                    setIsEditLeadOpen(open)
                    if (!open) setSelectedLead(null)
                }}
                open={isEditLeadOpen && Boolean(selectedLead)}
            >
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>{t('leads.edit.title')}</DialogTitle>
                        <DialogDescription>{t('leads.edit.description')}</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <ScrollArea className='max-h-[70vh] pr-4'>
                        {selectedLead ? (
                            <LeadEditForm
                                campaigns={campaigns}
                                lead={{
                                    id: selectedLead.id,
                                    name: selectedLead.name,
                                    primaryPhoneCountryCode: normalizeCountryCode(selectedLead.primaryPhoneCountryCode),
                                    primaryPhoneNumber: selectedLead.primaryPhoneNumber ?? '',
                                    email: selectedLead.email,
                                    leadSource: selectedLead.leadSource ?? 0,
                                    internalCampaignId: selectedLead.internalCampaignId,
                                    status: selectedLead.status ?? null,
                                    sellerId: selectedLead.sellerId ?? null,
                                    companyId: selectedLead.companyId ?? null,
                                    disciplineId: selectedLead.disciplineId ?? null,
                                    secondaryPhoneCountryCode: normalizeCountryCode(selectedLead.secondaryPhoneCountryCode),
                                    secondaryPhoneNumber: selectedLead.secondaryPhoneNumber ?? null,
                                    gender: selectedLead.gender ?? null,
                                    age: selectedLead.age ?? null,
                                    reason: selectedLead.reason ?? null,
                                    eventSourceUrl: selectedLead.eventSourceUrl ?? null
                                }}
                                onSuccess={() => {
                                    setIsEditLeadOpen(false)
                                    setSelectedLead(null)
                                }}
                                phoneCountries={phoneCountries}
                            />
                        ) : null}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}
