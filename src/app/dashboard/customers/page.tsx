import TableCustomerSection from "@/src/features/business/components/ambience/customer/table-customer-section"
import { getDashCustomersByRap } from "@/src/features/business/services/user.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button"
import { HeaderSegmentInjector } from "@/src/shared/components/agenrap-ui/header/header-segment-injector"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { BusinessCtx } from "@/src/shared/types"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { redirect } from "next/navigation"
interface SearchParams {
    page?: string
    rap?: string
    filter?: "all" | "merged"
}
export default async function DashCustomerPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>
}) {
    const { page, rap, filter } = await searchParams
    const pageNumber = Number(page) || 1
    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?atSign=${normalizePublicHandle(rap)}`)
    if (!targetBuinessWithServices) return <div>Algo deu errado!</div>
    const resCustomers = await getDashCustomersByRap(rap ?? "", (filter as 'all' | 'merged' | null) ?? null, pageNumber)

    return (
        <>
            <BusinessInitializer data={targetBuinessWithServices} />
            <div className="flex flex-col gap-y-8 mx-auto lg:w-[90%] w-[95%] mb-12 md:mb-6">
                <div className="flex md:hidden">

                    <HeaderSegmentInjector segments={[
                        { label: 'Adicionar', href: `/dashboard/customers/new?rap=${rap}`, active: false },
                        { label: 'Ver Todos', href: `/dashboard/customers?rap=${rap}`, active: true },
                    ]} />
                </div>
                <div className="flex  justify-between  gap-6  w-full ">
                    <div className="flex flex-col gap-1 ">
                        <h1 className="font-tree font-semibold lg:text-2xl text-xl">
                            Clientes
                        </h1>
                        <p className="font-tree text-sm text-(--agenrap-brown-500)/60">
                            {resCustomers.data.length > 0
                                ? `${resCustomers.totalCount} cliente${resCustomers.totalCount !== 1 ? "s" : ""} cadastrado${resCustomers.totalCount !== 1 ? "s" : ""}`
                                : "Nenhum cliente cadastrado ainda"}
                        </p>
                    </div>
                    <div className="hidden md:flex ">
                        <AgenrapSegmentedControl segments={[
                            { label: 'Adicionar', href: `/dashboard/customers/new?rap=${rap}`, active: false },
                            { label: 'Ver Todos', href: `/dashboard/customers?rap=${rap}`, active: true },
                        ]} />
                    </div>
                </div>
                <TableCustomerSection
                    page={resCustomers.page}
                    hasNextPage={resCustomers.hasNextPage}
                    hasPrevPage={resCustomers.hasPreviousPage}
                    totalPages={resCustomers.totalPages}
                    customers={resCustomers.data} />
            </div>
        </>

    )
}