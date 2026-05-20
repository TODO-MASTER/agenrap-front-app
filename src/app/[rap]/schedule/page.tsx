import { Service } from "@/src/features/business/types"
import QuickSchedulingAnnouncementSection from "@/src/features/customers/components/schedule-maker/quick-scheduling-announcement-section"
import QuickSchedulingSection from "@/src/features/customers/components/schedule-maker/quick-scheduling-section"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { BusinessCtx } from "@/src/shared/types"

export default async function AppointmentPage({ params, searchParams, }: { params: Promise<{ rap: string }>, searchParams: Promise<{ svs?: string }> }) {
    const { rap: rawRap } = await params
    const { svs: rawSvs } = await searchParams
    const rap = decodeURIComponent(rawRap)
    const svsId = Number(rawSvs)

    if (!rap?.startsWith("@")) return <div>ALGO ESTÁ ERRADO</div>

    const businessTarget = await serverFetch<BusinessCtx>(`business/per?businessName=${rap}`)
    const svsById = await serverFetch<Service>(`service/get-one?svsId=${svsId}`)
    if (svsById == null) return <div>Serviço não encontrado</div>

    const appointments = await serverFetch<AppointmentCancelRes>(`appointment/next-view?businessId=${businessTarget?.id}`)
    const existingAppointment = appointments?.data?.[0] ?? null

    return (
        <div className="flex flex-col my-12 items-center w-full justify-center">
            <BusinessInitializer data={businessTarget} />
            <div className="flex flex-col lg:w-[70%] md:w-[80%] w-[90%]">
                <QuickSchedulingAnnouncementSection businessTarget={businessTarget} serviceTarget={svsById} />
                <QuickSchedulingSection existingAppointment={existingAppointment} />
            </div>
        </div>
    )
}