import DashboardSidebarProvider from "@/src/providers/DashboardSidebarProvider";
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/AgenrapCalendar";
import AgenrapDialogScheduleForm from "@/src/shared/components/agenrap-ui/dialog/AgenrapDialogScheduleForm";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import AgenrapSidebar from "@/src/shared/components/agenrap-ui/sidebar/AgenrapSideBar";

import { SidebarInset } from "@/src/shared/components/ui/sidebar";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Home | Agenrap",
    description: "Agenda automatizada"
};

export default function HomePage() {
    return (
     <DashboardSidebarProvider>
      <AgenrapSidebar color="#" />
     <SidebarInset className="flex flex-col overflow-hidden">
        <div className="flex md:hidden w-full">
        <AgenrapHeader isDefault={false} />
        </div>
        <main className="flex-1 p-4">
        </main>
      </SidebarInset>
    </DashboardSidebarProvider>
    )
}
