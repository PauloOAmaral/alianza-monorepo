import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '~/utils/index'

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive: 'bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 [a&]:hover:underline',
                success: 'bg-emerald-300 border border-emerald-400 text-emerald-950 [a&]:hover:bg-green-500/90',
                error: 'bg-red-300 border border-red-400 text-red-950 [a&]:hover:bg-red-500/90',
                warning: 'bg-yellow-300 border border-yellow-400 text-yellow-950 [a&]:hover:bg-yellow-500/90',
                info: 'bg-blue-300 border border-blue-400 text-blue-950 [a&]:hover:bg-blue-500/90',
                muted: 'bg-gray-300 border border-gray-400 text-gray-950 [a&]:hover:bg-gray-500/90',
                light: 'bg-white border border-gray-200 text-gray-950 [a&]:hover:bg-gray-500/90',
                dark: 'bg-black border border-gray-800 text-white [a&]:hover:bg-gray-500/90',
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

function Badge({
    className,
    variant = 'default',
    asChild = false,
    ...props
}: React.ComponentPropsWithoutRef<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'span'

    return <Comp className={cn(badgeVariants({ variant }), className)} data-slot='badge' data-variant={variant} {...props} />
}

export { Badge, badgeVariants }
