import { BusinessRes } from "@/src/features/business/types/business.types"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { redirect } from "next/navigation"
export default async function ServicePage({
    searchParams
}: {
    searchParams: Promise<{ rap:string }>
})    {
         const {rap:bsnEncoded } = await searchParams
         if(!bsnEncoded){
            redirect(`/login`)
         }
     const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`)
        if (res) {
            redirect(`/new`)
        }
    return (
     <p>Algo deu errado :/</p>
    )
}