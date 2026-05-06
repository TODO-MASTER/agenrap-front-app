import AddWorkingPeriodForm from "@/src/features/business/components/ambience/workingPeriod/AddWorkingPeriodForm"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services/WorkingService"
import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { normalizeWeek } from "@/src/shared/utils/normalizeWeek"
import { redirect } from "next/navigation"

export default async function CreateWorkingPeriodPage({
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
            <AddWorkingPeriodForm weeks={allWeeks} tgBns={bsnEncoded}/>
        </div>
    )
}