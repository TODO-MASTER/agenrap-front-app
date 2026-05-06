import DashboardSidebarProvider from "@/src/providers/DashboardSidebarProvider";
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/AgenrapCalendar";
import AgenrapDialogScheduleForm from "@/src/shared/components/agenrap-ui/dialog/AgenrapDialogJoinSchedule";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import AgenrapSidebar from "@/src/shared/components/agenrap-ui/sidebar/AgenrapSideBar";

import { SidebarInset } from "@/src/shared/components/ui/sidebar";
import { IBusinessFullRes, IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";

import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: "Home | Agenrap",
    description: "Agenda automatizada"
};

export default async function HomePage({
    searchParams
}: {
    searchParams: Promise<{ bns:string }>
})    {
         const {bns:bsnEncoded } = await searchParams
     const res = await serverFetch<IBusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
        if (!res || !res.alreadyInitial) {
            const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
            redirect(`/business/booking-link?flash=${msg}`)
        }
    return (
     <>oie</>
    )
}
