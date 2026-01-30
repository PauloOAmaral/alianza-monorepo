import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { Tooltip, TooltipTrigger } from './ui/tooltip'
import { ClientOnly, Slot } from './utils'

export interface PermissionContextType {
    errorMessageForPage: string
    errorMessageForAction: string
}

const PermissionContext = createContext<PermissionContextType | null>(null)

export interface PermissionProviderProps {
    errorMessageForPage: string
    errorMessageForAction: string
    children: ReactNode
}

export function PermissionProvider({ errorMessageForPage, errorMessageForAction, children }: PermissionProviderProps) {
    return (
        <PermissionContext.Provider
            value={{
                errorMessageForPage,
                errorMessageForAction
            }}
        >
            {children}
        </PermissionContext.Provider>
    )
}

function usePermission() {
    const context = useContext(PermissionContext)
    if (!context) {
        throw new Error('usePermission must be used within a PermissionProvider')
    }
    return context
}

export interface WithPermissionProps {
    hasPermission: boolean
    type?: 'page' | 'action'
    mode?: 'tooltip' | 'disabled' | 'hide'
    children: ReactNode
}

/**
 * @description This component is used to conditionally render a component based on the user's permission.
 * @param type - The type of permission to check. Defaults to "action".
 * @param mode - The mode to render the component. Defaults to "hide".
 * @param hasPermission - Whether the user has the permission.
 * @param children - The component to render.
 * @returns The component to render.
 */
const WithPermission = ({ type = 'action', mode = 'hide', hasPermission, children }: WithPermissionProps) => {
    const { errorMessageForPage, errorMessageForAction } = usePermission()
    const permissionMessage = type === 'page' ? errorMessageForPage : errorMessageForAction
    const isChildNavLink = (children as any)?.type?.displayName === 'NavLink'

    const childProps = {
        ...(isChildNavLink
            ? {
                  ...(hasPermission ? {} : { prefetch: 'none', 'aria-disabled': true }),
                  onClick: (e: React.MouseEvent<HTMLElement>) => e.preventDefault()
              }
            : { isDisabled: !hasPermission })
    }

    return (
        <ClientOnly>
            {() => {
                if (!hasPermission && mode === 'hide') {
                    return null
                }

                if (!hasPermission && mode === 'disabled') {
                    return <Slot {...childProps}>{children}</Slot>
                }

                if (!hasPermission && mode === 'tooltip') {
                    return (
                        <TooltipTrigger>
                            <Slot {...childProps}>{children}</Slot>
                            <Tooltip>{permissionMessage}</Tooltip>
                        </TooltipTrigger>
                    )
                }

                return children
            }}
        </ClientOnly>
    )
}

WithPermission.displayName = 'WithPermission'

export { WithPermission }
