import { Button } from '@alianza/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@alianza/ui/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher, useLocation } from 'react-router'
import type { action, loader } from '~/routes/sellers'
import { getSellerDisplayName } from './sellers-table'
import { DialogActivate } from '~/components/basic/dialog-activate'
import { DialogInactivate } from '~/components/basic/dialog-inactivate'

type LoaderData = Awaited<ReturnType<typeof loader>>
type ResolvedData = Awaited<LoaderData['data']>
type Seller = ResolvedData[number]

interface SellersTableActionProps {
    seller: Seller
}

export function SellersTableAction({ seller }: SellersTableActionProps) {
    const { t } = useTranslation()
    const location = useLocation()

    const fetcher = useFetcher<typeof action>()

    const [activateOpen, setActivateOpen] = useState(false)
    const [inactivateOpen, setInactivateOpen] = useState(false)

    const displayName = getSellerDisplayName(seller)

    const pending = fetcher.state !== 'idle'

    async function handleActivate() {
        await fetcher.submit({ intent: 'activate-seller', id: seller.id }, { method: 'POST' })

        setTimeout(() => {
            setActivateOpen(false)
        }, 200)
    }

    async function handleInactivate() {
        await fetcher.submit({ intent: 'inactivate-seller', id: seller.id }, { method: 'POST' })

        setTimeout(() => {
            setActivateOpen(false)
        }, 200)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size='icon' variant='ghost'>
                        <MoreHorizontal className='size-4' />
                        <span className='sr-only'>{t('tables.buttons.actions')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem asChild>
                        <Link to={`/sellers/${seller.id}/edit${location.search}`}>{t('tables.buttons.edit')}</Link>
                    </DropdownMenuItem>
                    {!seller.isActive && <DropdownMenuItem onSelect={() => setActivateOpen(true)}>{t('tables.buttons.active')}</DropdownMenuItem>}
                    {seller.isActive && <DropdownMenuItem onSelect={() => setInactivateOpen(true)}>{t('tables.buttons.inactive')}</DropdownMenuItem>}
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogActivate
                isOpen={activateOpen}
                description={t('dialogs.sellers.activate.description', { name: displayName })}
                activatePending={pending}
                handleActivate={handleActivate}
                onOpenChange={setActivateOpen}
            />
            <DialogInactivate
                isOpen={inactivateOpen}
                description={t('dialogs.sellers.inactivate.description', { name: displayName })}
                inactivatePending={pending}
                handleInactivate={handleInactivate}
                onOpenChange={setInactivateOpen}
            />
        </>
    )
}
