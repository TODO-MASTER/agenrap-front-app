import DashboardSidebarProvider from "@/src/providers/dashboard-side-bar-provider";
import { HeaderSegmentsProvider } from "@/src/providers/header-segments-provider";
import DashboardMobileNav from "@/src/shared/components/agenrap-ui/dashboard-mobile-nav";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import MobileHeaderScroll from "@/src/shared/components/agenrap-ui/header/mobile-header-scroll";
import AgenrapSidebar from "@/src/shared/components/agenrap-ui/sidebar/agenrap-side-bar";
import ProfileDialogRoot from "@/src/shared/components/agenrap-ui/wrappers/profile-dialog-root";
import UserHydration from "@/src/shared/components/agenrap-ui/wrappers/user-hydration";
import { SidebarInset } from "@/src/shared/components/ui/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <HeaderSegmentsProvider>
            <DashboardSidebarProvider>
                <UserHydration />
                <ProfileDialogRoot />
                <AgenrapSidebar color="#" />
                <SidebarInset className="flex flex-col overflow-hidden">
                    <MobileHeaderScroll  />

<main className="p-2 pt-24 md:p-8 pb-44 md:pb-16 lg:pb-0 lg:pt-8">
                        {children}
                    </main>
                    <DashboardMobileNav />
                </SidebarInset>
            </DashboardSidebarProvider>
        </HeaderSegmentsProvider>
    )
}