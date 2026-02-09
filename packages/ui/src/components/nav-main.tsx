import type { Icon } from '@tabler/icons-react'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'

export function NavMain({
    items,
    currentPath
}: {
    items: {
        title: string
        url: string
        icon?: Icon
    }[]
    currentPath?: string
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className='flex flex-col gap-2'>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.url === '/' ? currentPath === '/' : Boolean(currentPath?.startsWith(item.url))}
                                tooltip={item.title}
                            >
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
