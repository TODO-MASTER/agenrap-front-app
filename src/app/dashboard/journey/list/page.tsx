import AddWorkingPeriodForm from "@/src/features/business/components/ambience/workingPeriod/AddWorkingPeriodForm"
import ShowWorkingPeriods from "@/src/features/business/components/ambience/workingPeriod/ShowWorkingPeriods"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services/WorkingService"
import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { normalizeWeek } from "@/src/shared/utils/normalizeWeek"
import { redirect } from "next/navigation"

export default async function ShowCaseWorkingPeriodPage({
    searchParams
}: {
    searchParams: Promise<{ bns: string }>
}) {
    const { bns: bsnEncoded } = await searchParams
    const res = await serverFetch<IBusinessRes>(`business/search-by-user?businessName=${bsnEncoded}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    const weeks = await GetWorkingPeriodPerRap(bsnEncoded)
    const allWeeks = normalizeWeek(weeks)

    return(
        <div className="flex flex-col  ">
            <ShowWorkingPeriods weeks={allWeeks} tgBns={bsnEncoded}/>
        </div>
    )
}