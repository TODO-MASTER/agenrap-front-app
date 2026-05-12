import ShowcaseDashServices from "@/src/features/business/components/ambience/service/showcase-dash-services"
import { BusinessRes } from "@/src/features/business/types/business.types"

import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"

import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { GetBusinessPerRap } from "@/src/shared/services/business.service"

import { redirect } from "next/navigation"

export default async function ShowServicePage({
    searchParams
}: {
    searchParams: Promise<{ bns: string }>
}) {
    const { bns: bsnEncoded } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const resService = await GetBusinessPerRap(bsnEncoded)
    return (
        <div className="">  
        <BusinessInitializer data={resService}/>
        <ShowcaseDashServices />
        </div>
    )
}