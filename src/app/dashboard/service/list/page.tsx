import ShowcaseDashServices from "@/src/features/business/components/ambience/service/ShowcaseDashServices"
import { GetServicePerRap } from "@/src/features/business/services/ServiceService"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/BusinessInitializer"
import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx"
import { redirect } from "next/navigation"

export default async function ShowServicePage({
    searchParams
}: {
    searchParams: Promise<{ bns: string }>
}) {
    const { bns: bsnEncoded } = await searchParams
    const res = await serverFetch<IBusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const resService = await GetServicePerRap(bsnEncoded)
    return (
        <div className="">  
        <BusinessInitializer data={resService}/>
        <ShowcaseDashServices />
        </div>
    )
}