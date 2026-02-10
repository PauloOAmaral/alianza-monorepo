import { cn } from '@alianza/ui/utils/cn'
import { FormProvider, type UseFormReturn } from 'react-hook-form'

type BasicForm = {
    addProvider: UseFormReturn<any, any, any>
    onSubmit: (values: any) => void
    className?: string
    children: React.ReactNode
}

export function BasicForm({ addProvider, onSubmit, className, children }: BasicForm) {
    return (
        <FormProvider {...addProvider}>
            <form className={cn('space-y-4', className)} onSubmit={addProvider.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}
