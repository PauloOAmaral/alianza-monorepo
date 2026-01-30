import { Button } from '@alianza/ui/components/ui/button'
import { Trans } from 'react-i18next'
import { NavLink } from 'react-router'
import { requireSession } from '~/middleware/session-middleware'
import { ENV } from '~/utils/env'
import type { Route } from './+types/home'

export const handle = {
    breadcrumb: () => [
        <NavLink key='/' to='/'>
            <Trans i18nKey='titles.home' />
        </NavLink>
    ]
}

export function meta() {
    return [{ title: 'Home dashboard Alianza' }, { name: 'description', content: 'Welcome to your Alianza dashboard' }]
}

export async function loader({ request }: Route.LoaderArgs) {
    await requireSession(request)

    return { message: ENV.VALUE_FROM_CLOUDFLARE }
}

export default function ({ loaderData }: Route.ComponentProps) {
    return (
        <div className='flex-1 flex flex-col gap-4'>
            <Button variant='default'>Click me</Button>
            <p>{loaderData.message}</p>
        </div>
    )
}
