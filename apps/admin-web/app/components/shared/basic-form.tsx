import { FormProvider, type UseFormReturn } from 'react-hook-form'

type BasicForm = {
    addProvider: UseFormReturn<any, any, any>
    onSubmit: (values: any) => void
    children: React.ReactNode
}

export function BasicForm({ addProvider, onSubmit, children }: BasicForm) {
    return (
        <FormProvider {...addProvider}>
            <form className='space-y-4' onSubmit={addProvider.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}
