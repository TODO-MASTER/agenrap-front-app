import ServiceEditorOrchestre from "@/src/features/business/components/ambience/service/service-editor-orchestre"
import ShowcaseDashServices from "@/src/features/business/components/ambience/service/showcase-dash-services"
import { BusinessRes } from "@/src/features/business/types/business.types"

import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"

import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { GetBusinessPerRap } from "@/src/shared/services/business.service"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"

import { redirect } from "next/navigation"
export const dynamic = 'force-dynamic'
export default async function ShowServicePage({
    searchParams
}: {
    searchParams: Promise<{ rap: string,mode?:string }>
}) {
    const { rap: bsnEncoded,mode:mode } = await searchParams
        if (!bsnEncoded) redirect('/login') 
    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const resService = await GetBusinessPerRap(bsnEncoded)
    return (
        <div className="">  
        <BusinessInitializer data={resService}/>
  
        <ServiceEditorOrchestre tgrap={res.atSign} initialMode={mode=="new"?"new":"list"}/>
        </div>
    )
}