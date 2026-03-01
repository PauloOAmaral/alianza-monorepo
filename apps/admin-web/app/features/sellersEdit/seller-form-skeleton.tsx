import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'

function FieldSkeleton() {
    return (
        <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full' />
        </div>
    )
}

export function SellerEditFormSkeleton() {
    return (
        <FieldGroup className='grid gap-4 md:grid-cols-2'>
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
            <div className='md:col-span-2'>
                <FieldSkeleton />
            </div>
        </FieldGroup>
    )
}
