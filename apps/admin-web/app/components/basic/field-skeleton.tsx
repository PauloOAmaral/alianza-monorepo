import { Skeleton } from '@alianza/ui/components/ui/skeleton'

export function FieldSkeleton() {
    return (
        <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full' />
        </div>
    )
}

export function TextareaFieldSkeleton() {
    return (
        <div className='space-y-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-24 w-full' />
        </div>
    )
}
