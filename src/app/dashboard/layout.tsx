import DashboardSidebarProvider from "@/src/providers/dashboard-side-bar-provider";
import { HeaderSegmentsProvider } from "@/src/providers/header-segments-provider";
import StaffContextProvider from "@/src/providers/staff-context-provider";
import { FeedbackButton } from "@/src/shared/components/agenrap-ui/button/feedback-button";
import DashboardMobileNav from "@/src/shared/components/agenrap-ui/dashboard-mobile-nav";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import MobileHeaderScroll from "@/src/shared/components/agenrap-ui/header/mobile-header-scroll";
import StaffContextGate from "@/src/shared/components/agenrap-ui/staff-context-gate";


import ProfileDialogRoot from "@/src/shared/components/agenrap-ui/wrappers/profile-dialog-root";
import UserHydration from "@/src/shared/components/agenrap-ui/wrappers/user-hydration";
import { SidebarInset } from "@/src/shared/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HeaderSegmentsProvider>
      <DashboardSidebarProvider>
        <UserHydration />
        <ProfileDialogRoot />
        <Suspense
          fallback={
            <div className="w-16 h-full border-r border-r-black/20 bg-(--agenrap-brown-200)" />
          }
        >
          <StaffContextProvider>
            <StaffContextGate />
            <SidebarInset className="flex flex-col overflow-hidden">
              <MobileHeaderScroll />
              <main className="p-2 px-8 pt-12 md:p-8 pb-44 md:pb-16 lg:pb-0 lg:pt-8">
                {children}
              </main>
              <Suspense fallback={<div className="p-8">Carregando dashboard...</div>}>
                <DashboardMobileNav />
              </Suspense>
            </SidebarInset>
          </StaffContextProvider>
        </Suspense>
      </DashboardSidebarProvider>
    </HeaderSegmentsProvider>
  )
}