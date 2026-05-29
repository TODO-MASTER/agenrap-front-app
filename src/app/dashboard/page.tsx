
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import TableCustomerSection from "@/src/features/business/components/ambience/customer/table-customer-section";
import { BusinessRes } from "@/src/features/business/types/business.types";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";


export const metadata: Metadata = {
    title: "Home | Agenrap",
    description: "Agenda automatizada"
};


export default async function HomePage({
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



    return (
        <>
            oie
        </>
    )
}
