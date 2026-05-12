import AddWorkingPeriodForm from "@/src/features/business/components/ambience/working-period/add-working-period-form"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services/working-period.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizeWeek } from "@/src/shared/utils/normalize-week.utils"
import { redirect } from "next/navigation"

export default async function CreateWorkingPeriodPage({
    searchParams
}: {
    searchParams: Promise<{ bns: string }>
}) {
    const { bns: bsnEncoded } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const weeks = await GetWorkingPeriodPerRap(bsnEncoded)
    const allWeeks = normalizeWeek(weeks)

    return(
        <div className="flex flex-col  ">
            <AddWorkingPeriodForm weeks={allWeeks} tgBns={bsnEncoded}/>
        </div>
    )
}