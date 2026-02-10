import { FieldSkeleton } from "~/components/basic/field-skeleton";
import { FieldGroup } from "@alianza/ui/components/ui/field";
import { Skeleton } from "@alianza/ui/components/ui/skeleton";


export function LeadNewFormSkeleton() {
    return (
        <>
            <FieldGroup className='grid gap-4'>
                <FieldSkeleton />
                <div className='grid gap-2 sm:grid-cols-[220px_1fr]'>
                    <FieldSkeleton />
                    <FieldSkeleton />
                </div>
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
            </FieldGroup>
            <div className='flex flex-wrap items-center gap-2'>
                <Skeleton className='h-9 w-20' />
                <Skeleton className='h-9 w-20' />
            </div>
        </>
    )
}   