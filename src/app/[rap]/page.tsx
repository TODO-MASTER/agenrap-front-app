import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"

import { Metadata } from "next"
import ShowcaseSection from "@/src/features/customers/components/service-showcase/showcase-section/showcase-section"
import OnlineCalendarSection from "@/src/features/customers/components/service-showcase/online-calendar-section"
import ServiceShowcaseHeader from "@/src/shared/components/agenrap-ui/header/service-showcase-header"
import { BusinessCtx } from "@/src/shared/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"

export const metadata: Metadata = {
  title: "Agenda - Agenrap",
  description: "Automatize sua agenda",
        icons: {
    icon: '/favicon.svg', 
    
  },
  
};

export default async function ServiceScheduleServicePage({ params }: { params: Promise<{ rap: string }> }) {
    const { rap: rawRap } = await params
    const rap = decodeURIComponent(rawRap)

    if (!rap?.startsWith("@")) return <div>ALGO ESTÁ ERRADO</div>

    const targetBusinessWithServices = await serverFetch<BusinessCtx>(
        `business/per?atSign=${normalizePublicHandle(rap)}`
    )

    if (!targetBusinessWithServices) return <div>Negócio não encontrado</div>

    const token = (await cookies()).get('token')?.value
    const isLoggedIn = !!token

        if(targetBusinessWithServices.isOwner) redirect(`/dashboard?rap=${rap}`)

    if (!isLoggedIn) {
        redirect(`/login?rap=${encodeURIComponent(rap)}`)
    }

    return (
        <>
            <BusinessInitializer data={targetBusinessWithServices} />
            <ServiceShowcaseHeader />
            <OnlineCalendarSection />
            <ShowcaseSection rap={rap}/>
        </>
    )
}
