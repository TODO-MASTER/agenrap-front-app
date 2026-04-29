import QuickSchedulingAnnouncementSection from "@/src/features/customers/ScheduleMaker/QuickSchedulingAnnouncementSection"
import QuickSchedulingSection from "@/src/features/customers/ScheduleMaker/QuickSchedulingSection"
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/AgenrapCalendar"
import CardServiceFit from "@/src/shared/components/agenrap-ui/card/CardServiceFit"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/BusinessInitializer"
import { IServicesRes } from "@/src/shared/interfaces/responses/IServiceRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx"
import { currencyUtils } from "@/src/shared/utils/currencyUtils"
import { CalendarClockIcon } from "lucide-react"

export default async function AppointmentPage({ params, searchParams, }: { params: Promise<{ rap: string }>, searchParams: Promise<{ svs?: string }> }) {
    const { rap: rawRap } = await params
    const { svs: rawSvs } = await searchParams
    const rap = decodeURIComponent(rawRap)
    const svsId = Number(rawSvs)

    if (!rap?.startsWith("@")) return <div>ALGO ESTÁ ERRADO</div>

    const businessTarget = await serverFetch<IBusinessCtx>(`business/per?businessName=${rap}`)
    const svsById = await serverFetch<IServicesRes>(`service/get-one?svsId=${svsId}`)
    if (svsById == null) return <div>Serviço não encontrado</div>
    return (
        <div className="flex flex-col my-12  items-center  w-full justify-center ">
            <BusinessInitializer data={businessTarget} />
            <div className="flex flex-col lg:w-[70%] md:w-[80%] w-[90%]  ">
                <QuickSchedulingAnnouncementSection businessTarget={businessTarget} serviceTarget={svsById} />
                <QuickSchedulingSection />
            </div>
        </div>

    )
} 