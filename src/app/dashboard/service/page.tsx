import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { redirect } from "next/navigation"
//MIGRAR ESSA PAGE PARA /NEW OR /LIST
export default async function ServicePage({
    searchParams
}: {
    searchParams: Promise<{ bns:string }>
})    {
         const {bns:bsnEncoded } = await searchParams
         if(!bsnEncoded){
            redirect(`/login`)
         }
     const res = await serverFetch<IBusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
        if (res) {
            redirect(`/new`)
        }
    return (
     <>oie</>
    )
}