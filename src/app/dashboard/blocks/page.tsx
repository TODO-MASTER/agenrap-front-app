import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { redirect } from "next/navigation"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"
import { BusinessCtx } from "@/src/shared/types"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"

export default async function BlocksPage({
    searchParams
}: {
    searchParams: Promise<{ rap: string; kind?: string; mode?: string }>
}) {
    const { rap, kind, mode } = await searchParams

    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)

    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }

    const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?atSign=${normalizePublicHandle(rap)}`)

    return (
        <div className="flex flex-col w-full">
            <BusinessInitializer data={targetBuinessWithServices} />
            <RangeTurnManager
                tgrap={rap}
                initialKind={kind === "time" ? "time" : "day"}
                initialMode={mode === "list" ? "list" : "new"}
            />
        </div>
    )
}