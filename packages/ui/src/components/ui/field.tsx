import { cva, type VariantProps } from 'class-variance-authority'
import React, { useMemo } from 'react'
import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/utils/cn'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
    return <fieldset className={cn('flex flex-col gap-6', 'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', className)} data-slot='field-set' {...props} />
}

type FormItemContextValue = {
    id: string
}

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formErrorId: `${id}-form-item-error`,
        ...fieldState
    }
}

function FieldLegend({ className, variant = 'legend', ...props }: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
    return <legend className={cn('mb-3 font-medium', 'data-[variant=legend]:text-base', 'data-[variant=label]:text-sm', className)} data-slot='field-legend' data-variant={variant} {...props} />
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4', className)}
            data-slot='field-group'
            {...props}
        />
    )
}

const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
    variants: {
        orientation: {
            vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
            horizontal: [
                'flex-row items-center',
                '[&>[data-slot=field-label]]:flex-auto',
                'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
            ],
            responsive: [
                'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
                '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
                '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
            ]
        }
    },
    defaultVariants: {
        orientation: 'vertical'
    }
})

function Field({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
    const { error, formItemId, formDescriptionId, formErrorId } = useFormField()

    return (
        <div
            aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formErrorId}`}
            aria-invalid={!!error}
            className={cn(fieldVariants({ orientation }), className)}
            data-orientation={orientation}
            data-slot='field'
            id={formItemId}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)} data-slot='field-content' {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
    return (
        <Label
            className={cn(
                'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
                'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
                'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
                className
            )}
            data-slot='field-label'
            {...props}
        />
    )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50', className)} data-slot='field-label' {...props} />
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
    const { formDescriptionId } = useFormField()

    return (
        <p
            className={cn(
                'text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
                'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
                '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
                className
            )}
            data-slot='field-description'
            id={formDescriptionId}
            {...props}
        />
    )
}

function FieldSeparator({
    children,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    children?: React.ReactNode
}) {
    return (
        <div className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)} data-content={!!children} data-slot='field-separator' {...props}>
            <Separator className='absolute inset-0 top-1/2' />
            {children && (
                <span className='bg-background text-muted-foreground relative mx-auto block w-fit px-2' data-slot='field-separator-content'>
                    {children}
                </span>
            )}
        </div>
    )
}

function FieldError({
    className,
    children,
    ...props
}: React.ComponentProps<'div'> & {
    errors?: Array<{ message?: string } | undefined>
}) {
    const { error, formErrorId } = useFormField()

    const body = useMemo(() => {
        if (children) {
            return children
        }

        if (!error) {
            return null
        }

        return String(error.message)
    }, [children, error])

    if (!body) {
        return null
    }

    return (
        <p className={cn('text-xs text-destructive', className)} id={formErrorId} {...props}>
            {body}
        </p>
    )
}

const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

FormField.displayName = 'FormField'

const FormItem = ({ ref, className, ...props }: React.ComponentProps<'div'>) => {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div className={cn('flex flex-col w-full gap-2 min-w-0', className)} ref={ref} {...props} />
        </FormItemContext.Provider>
    )
}

FormItem.displayName = 'FormItem'

export { FormField, Field, FieldLabel, FormItem, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle }
