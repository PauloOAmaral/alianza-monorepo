import { Card, CardContent } from '@alianza/ui/components/ui/card'
import { Input } from '@alianza/ui/components/ui/input'
import { useQueryStates } from 'nuqs'
import type { ReactNode } from 'react'

export const ActionBar = ({ children }: { children: ReactNode }) => {
    return (
        <Card>
            <CardContent className='flex gap-4'>
                <ActionBarGroup>{children}</ActionBarGroup>
            </CardContent>
        </Card>
    )
}

export const ActionBarGroup = ({ children }: { children: ReactNode }) => {
    return <div className='flex-col sm:flex-row'>{children}</div>
}

type ActionBarSearchFieldProps<T extends Record<string, any>> = {
    placeholder: string
    searchParams: T
}

export const ActionBarSearchField = <T extends Record<string, any>>({ placeholder, searchParams }: ActionBarSearchFieldProps<T>) => {
    const [filter, setFilter] = useQueryStates(searchParams, {
        shallow: false
    })

    return <Input onChange={e => setFilter({ ...filter, query: e.target.value })} placeholder={placeholder} value={filter.query ?? ''} />
}
