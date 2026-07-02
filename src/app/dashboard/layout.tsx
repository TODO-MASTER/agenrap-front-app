import DashboardSidebarProvider from "@/src/providers/dashboard-side-bar-provider";
import { HeaderSegmentsProvider } from "@/src/providers/header-segments-provider";
import DashboardMobileNav from "@/src/shared/components/agenrap-ui/dashboard-mobile-nav";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import MobileHeaderScroll from "@/src/shared/components/agenrap-ui/header/mobile-header-scroll";
import AgenrapSideBar from "@/src/shared/components/agenrap-ui/sidebar/agenrap-side-bar";

import ProfileDialogRoot from "@/src/shared/components/agenrap-ui/wrappers/profile-dialog-root";
import UserHydration from "@/src/shared/components/agenrap-ui/wrappers/user-hydration";
import { SidebarInset } from "@/src/shared/components/ui/sidebar";
import { Suspense } from "react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (

        <HeaderSegmentsProvider>
            <DashboardSidebarProvider>
                <UserHydration />
                <ProfileDialogRoot />
                   <Suspense fallback={null}>
                <AgenrapSideBar color="#" />
                </Suspense>
                <SidebarInset className="flex flex-col overflow-hidden">
                    <MobileHeaderScroll  />
        <Suspense fallback={<div className="p-8">Carregando dashboard...</div>}>
<main className="p-2 px-8 pt-12 md:p-8 pb-44 md:pb-16 lg:pb-0 lg:pt-8">
                        {children}
                    </main>
                    </Suspense>
                    <Suspense fallback={<div className="p-8">Carregando dashboard...</div>}>
                    <DashboardMobileNav />
                    </Suspense>
                </SidebarInset>
            </DashboardSidebarProvider>
        </HeaderSegmentsProvider>
    )
}