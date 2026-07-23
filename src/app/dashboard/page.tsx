import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { redirect } from "next/navigation"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { DashboardSummary } from "@/src/features/business/types/dashboard.types"
import DashboardClient from "@/src/features/business/components/ambience/dashboard/dashboard-client"
import { ApiResponse } from "@/src/shared/types"
import { SubscriptionStatusRes } from "@/src/features/business/services/subscription.service"


export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ rap: string }>
}) {
    const { rap: bsnEncoded } = await searchParams
    const res = await serverFetch<BusinessRes>(
        `business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`
    )
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from("Primeiro selecione um negócio").toString("base64")
        redirect(`/business/booking-link?flash=${msg}`)
    }
 
    const raw = await serverFetch<ApiResponse<DashboardSummary>>(
        `dashboard/summary?atSign=${normalizePublicHandle(bsnEncoded)}`
    )
    const summary = raw.data

        const subscription = await serverFetch<ApiResponse<SubscriptionStatusRes>>(
        `subscription/status?atSign=${normalizePublicHandle(bsnEncoded)}`
    ).catch(() => null)
 
    return( 

    <DashboardClient summary={summary!} businessName={res.name ?? res.atSign}         subscription={subscription?.data!}/>

    )
}