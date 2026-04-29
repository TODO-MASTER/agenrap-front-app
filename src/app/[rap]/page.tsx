import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/BusinessInitializer"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx"
import { Metadata } from "next"
import ShowcaseSection from "@/src/features/customers/components/ServiceShowcase/ShowcaseSection/ShowcaseSection"
import OnlineCalendarSection from "@/src/features/customers/components/ServiceShowcase/OnlineCalendarSection"
import ServiceShowcaseHeader from "@/src/shared/components/agenrap-ui/header/ServiceShowcaseHeader"

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
    const targetBuinessWithServices = await serverFetch<IBusinessCtx>(`business/per?businessName=${rap}`)
    if (!targetBuinessWithServices) return <div>Negócio não encontrado</div>
    return (
        <>
        <BusinessInitializer data={targetBuinessWithServices}/>
            <ServiceShowcaseHeader/>
            <OnlineCalendarSection />
            <ShowcaseSection rap={rap}/>

        </>
    )
}
