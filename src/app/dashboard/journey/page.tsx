import AddWorkingPeriodForm from "@/src/features/business/components/ambience/working-period/add-working-period-form"
import ShowWorkingPeriods from "@/src/features/business/components/ambience/working-period/show-working-periods"
import WorkingPeriodEditorOrchestre from "@/src/features/business/components/ambience/working-period/working-period-editor"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services/working-period.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { HeaderSegmentInjector } from "@/src/shared/components/agenrap-ui/header/header-segment-injector"
import { WeeksInitializer } from "@/src/shared/components/agenrap-ui/initializers/weeks-initializer"

import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { normalizeWeek } from "@/src/shared/utils/normalize-week.utils"
import { redirect } from "next/navigation"

export default async function WorkingPeriodPage({
    searchParams
}: {
    searchParams: Promise<{ rap: string,mode?:string }>
}) {
    const { rap: bsnEncoded,mode:mode } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const weeks = await GetWorkingPeriodPerRap(bsnEncoded)
    const allWeeks = normalizeWeek(weeks)

    return(
        <div className="flex flex-col ">
            <WeeksInitializer data={allWeeks}/>
        <WorkingPeriodEditorOrchestre  initialMode={mode=="new"?"new":"list"}  tgrap={bsnEncoded}/>
        </div>
    )
}