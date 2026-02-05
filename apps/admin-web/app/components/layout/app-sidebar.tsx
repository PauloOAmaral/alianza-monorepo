import { NavMain } from '@alianza/ui/components/nav-main'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@alianza/ui/components/ui/sidebar'
import { IconDashboard, IconInnerShadowTop, IconUsers } from '@tabler/icons-react'
import type * as React from 'react'
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
        },
        {
            title: 'Leads',
            url: '/leads',
            icon: IconUsers
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:p-1.5'>
                            <a href='/'>
                                <IconInnerShadowTop className='size-5' />
                                <span className='text-base font-semibold'>Alianza</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
