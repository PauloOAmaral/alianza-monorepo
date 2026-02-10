import { Trans, useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { requireSession } from '~/middleware/session-middleware'
import type { Route } from './+types/account'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>,
        <NavLink key='/account' to='/account'>
            <Trans i18nKey='formPages.account.title' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Minha conta | Alianza' }, { name: 'description', content: 'Dados da sua conta' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    const session = await requireSession(request)

    return { user: session.user }
}

export default function AccountRoute({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation()
    const { user } = loaderData

    return (
        <div className='flex flex-1 flex-col gap-6'>
            <div className='rounded-lg border bg-card p-6'>
                <h2 className='text-lg font-semibold mb-4'>{t('formPages.account.profile')}</h2>
                <dl className='grid gap-3 sm:grid-cols-2'>
                    <div>
                        <dt className='text-muted-foreground text-sm'>{t('fields.users.firstName.label')}</dt>
                        <dd className='font-medium'>{user.firstName ?? '-'}</dd>
                    </div>
                    <div>
                        <dt className='text-muted-foreground text-sm'>{t('fields.users.lastName.label')}</dt>
                        <dd className='font-medium'>{user.lastName ?? '-'}</dd>
                    </div>
                    <div className='sm:col-span-2'>
                        <dt className='text-muted-foreground text-sm'>{t('fields.users.email.label')}</dt>
                        <dd className='font-medium'>{user.email}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
