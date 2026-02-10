import { NavMain } from '@alianza/ui/components/nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@alianza/ui/components/ui/sidebar'
import { IconDashboard, IconInnerShadowTop, IconShoppingCart, IconUsers } from '@tabler/icons-react'
import type * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { NavUser } from '~/components/layout/nav-user'

const data = {
    user: {
        name: 'Alianza',
        email: 'info@alianza.com'
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            icon: IconDashboard
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation()
    const { t } = useTranslation()

    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:p-1.5'>
                            <Link to='/'>
                                <IconInnerShadowTop className='size-5' />
                                <span className='text-base font-semibold'>Alianza</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} currentPath={location.pathname} />

                <SidebarGroup>
                    <SidebarGroupLabel>{t('sidebar.comercial')}</SidebarGroupLabel>
                    <SidebarGroupContent className='flex flex-col gap-2'>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname.startsWith('/leads')}
                                    tooltip={t('sidebar.leads')}
                                >
                                    <Link to='/leads'>
                                        <IconUsers className='size-4' />
                                        <span>{t('sidebar.leads')}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname.startsWith('/sellers')}
                                    tooltip={t('sidebar.sellers')}
                                >
                                    <Link to='/sellers'>
                                        <IconShoppingCart className='size-4' />
                                        <span>{t('sidebar.sellers')}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
