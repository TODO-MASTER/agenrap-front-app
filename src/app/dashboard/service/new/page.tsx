import AddServicesForm from "@/src/features/business/components/ambience/service/AddServicesForm"
import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes"
import { serverFetch } from "@/src/shared/lib/serverFetch"
import { redirect } from "next/navigation"

export default async function CreateServicePage({
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
    return (
        <div className="flex flex-col ">
         
            <AddServicesForm tgBns={bsnEncoded} />
        </div>
    )
}