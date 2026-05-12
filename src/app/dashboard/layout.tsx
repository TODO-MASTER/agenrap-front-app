import DashboardSidebarProvider from "@/src/providers/dashboard-side-bar-provider";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import AgenrapSidebar from "@/src/shared/components/agenrap-ui/sidebar/agenrap-side-bar";
import { SidebarInset } from "@/src/shared/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
      return (
     <DashboardSidebarProvider>
      <AgenrapSidebar color="#" />
     <SidebarInset className="flex flex-col overflow-hidden">
        <div className="flex lg:hidden w-full">
        <AgenrapHeader isDefault={false} />
        </div>
        <main className=" lg:px-8 py-6 ">
            {children}
        </main>
      </SidebarInset>
    </DashboardSidebarProvider>
    )
}