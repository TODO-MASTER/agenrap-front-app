import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import AgenrapSidebar from "@/src/shared/components/agenrap-ui/sidebar/AgenrapSideBar";

import { SidebarInset, SidebarProvider } from "@/src/shared/components/ui/sidebar";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Home | Agenrap",
    description: "Agenda automatizada"
};

export default function HomePage() {

    return (
        <SidebarProvider>
            <AgenrapSidebar color="#" />
            <SidebarInset>
                <AgenrapHeader  isDefault={false} />
            </SidebarInset>
        </SidebarProvider>
    )
}