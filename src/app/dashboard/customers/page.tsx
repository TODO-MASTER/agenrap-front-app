import TableCustomerSection from "@/src/features/business/components/ambience/customer/table-customer-section"
import { getDashCustomersByRap } from "@/src/features/business/services/user.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { BusinessCtx } from "@/src/shared/types"
import { redirect } from "next/navigation"
interface SearchParams {
    page?: string
    bns?: string
}

export default async function DashCustomerPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>
}) {
    const { page, bns } = await searchParams
        const pageNumber = Number(page) || 1
    const res = await serverFetch<BusinessRes>(`business/search-by-user?businessName=${bns}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
        const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?businessName=${bns}`)
    if(!targetBuinessWithServices)return <div>Algo deu errado!</div>
    const resCustomers = await getDashCustomersByRap(bns??"",pageNumber)
    
    return(
        <>
        <BusinessInitializer data={targetBuinessWithServices}/>
        <TableCustomerSection customers={resCustomers.data}/>
        </>
    )
}