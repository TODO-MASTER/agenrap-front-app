import { BusinessRes } from "@/src/features/business/types/business.types"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { redirect } from "next/navigation"
export default async function ServicePage({
    searchParams
}: {
    searchParams: Promise<{ bns:string }>
})    {
         const {bns:bsnEncoded } = await searchParams
         if(!bsnEncoded){
            redirect(`/login`)
         }
     const res = await serverFetch<BusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
        if (res) {
            redirect(`/new`)
        }
    return (
     <p>Algo deu errado :/</p>
    )
}