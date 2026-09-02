
import BusinessDayToggles from "@/src/features/business/components/ambience/working-period/business-schedule-template"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services/working-period.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { WeeksInitializer } from "@/src/shared/components/agenrap-ui/initializers/weeks-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { normalizeWeek } from "@/src/shared/utils/normalize-week.utils"
import { redirect } from "next/navigation"

export default async function WorkingPeriodPage({
    searchParams
}: {
    searchParams: Promise<{ rap: string }>
}) {
    const { rap: bsnEncoded } = await searchParams

    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }

    const weeks = await GetWorkingPeriodPerRap(bsnEncoded)
    const allWeeks = normalizeWeek(weeks)

    return (
        <div className="flex flex-col">
            <WeeksInitializer data={allWeeks} />
            <BusinessDayToggles tgrap={bsnEncoded} />
        </div>
    )
}