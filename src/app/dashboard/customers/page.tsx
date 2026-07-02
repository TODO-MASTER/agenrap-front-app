import CustomersEditorOrchestre from "@/src/features/business/components/ambience/customer/customers-editor-orchestre"
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
export const dynamic = 'force-dynamic'
export default async function CustomersPage({
    searchParams
}: {
    searchParams: Promise<{ rap?: string; mode?: string; page?: string; filter?: string }>
}) {
    const { rap, mode, page, filter } = await searchParams
    if (!rap) redirect('/login')
    const pageNumber = Number(page) || 1

    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }

    const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?atSign=${normalizePublicHandle(rap)}`)
    const resCustomers = await getDashCustomersByRap(rap ?? "", (filter as 'all' | 'merged' | null) ?? null, pageNumber)

    return (
        <>
            <BusinessInitializer data={targetBuinessWithServices} />
            <CustomersEditorOrchestre
                tgrap={rap ?? ""}
                initialMode={mode === "new" ? "new" : "list"}
                customers={resCustomers.data}
                page={resCustomers.page}
                hasNextPage={resCustomers.hasNextPage}
                hasPrevPage={resCustomers.hasPreviousPage}
                totalPages={resCustomers.totalPages}
                totalCount={resCustomers.totalCount}
            />
        </>
    )
}