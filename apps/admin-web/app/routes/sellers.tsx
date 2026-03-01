import { updateSellerCommand } from '@alianza/application/commands/admin'
import { Button } from '@alianza/ui/components/ui/button'
import { Trans, useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router'
import { z } from 'zod'
import { getSellersGrid } from '~/features/sellers/loader-server'
import { SellersTable } from '~/features/sellers/sellers-table'
import { getI18nextServerInstance } from '~/middleware/i18next-middleware'
import { requireSession } from '~/middleware/session-middleware'
import { parseApplicationError } from '~/utils/server/errors'
import { createRequest } from '~/utils/server/request-builder'
import { dataWithError, dataWithSuccess } from '~/utils/server/toasts'
import type { Route } from './+types/sellers'

const activateSellerSchema = z.object({
    intent: z.literal('activate-seller'),
    id: z.string().min(1)
})

const inactivateSellerSchema = z.object({
    intent: z.literal('inactivate-seller'),
    id: z.string().min(1)
})

const sellerActionSchema = z.discriminatedUnion('intent', [activateSellerSchema, inactivateSellerSchema])

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

export async function action({ request }: Route.ActionArgs) {
    requireSession(request)

    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
    }

    const { t } = await getI18nextServerInstance(request)

    const formData = await request.formData()
    const parsed = sellerActionSchema.safeParse(Object.fromEntries(formData))

    if (!parsed.success) {
        const messages = parsed.error.issues.map(issue => issue.message).join('. ')
        return await dataWithError({ success: false }, messages, { status: 400 })
    }

    const { intent, id } = parsed.data
    const isActive = intent === 'activate-seller'

    try {
        await updateSellerCommand(createRequest(request, { id, isActive }))
        const message = isActive ? t('dialogs.sellers.activate.success') : t('dialogs.sellers.inactivate.success')
        return await dataWithSuccess({ success: true }, message)
    } catch (error) {
        return await dataWithError({ success: false }, await parseApplicationError(error as import('@alianza/application/error').ApplicationError<'base' | 'common' | 'auth'>, request))
    }
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
