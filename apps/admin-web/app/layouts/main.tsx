import { SidebarInset, SidebarProvider } from "@alianza/ui/components/ui/sidebar"
import { Outlet } from "react-router"
import { SiteHeader } from "~/components/basic/site-header"
import { AppSidebar } from "~/components/layout/app-sidebar"

export default function () {
    return (
        <div className="flex min-h-dvh w-full">
            <SidebarProvider>
                <AppSidebar variant="sidebar" />
                <SidebarInset>
                    <SiteHeader />
                    <div
                        className="flex flex-1 flex-col right-4"
                        style={{
                            right: "calc(var(--spacing) * 74)",
                            height: "calc(100dvh - var(--header-height))",
                        }}
                    >
                        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                            <Outlet />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
