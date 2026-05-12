
import ConfigWeeksForm from "@/src/features/business/components/initial-config-business/config-weeks-form/config-weeks-form";
import { BusinessRes } from "@/src/features/business/types/business.types";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/types/initial-business-config-urls";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { redirect } from "next/navigation";


export default async function BusinessInitialConfigPage({
    searchParams
}: {
    searchParams: Promise<{ bns:string }>
})  {
      const {bns:bsn } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?businessName=${bsn}`)
        if (res&&res.alreadyInitial) {
            redirect(`/dashboard?bns=${bsn}`);
        }
        else if (!res) {
        const msg = Buffer.from('Primeiro selecione ou crie um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }
    
    return (
        <>
            <AgenrapHeader isDefault={true}>
                {initialBusinessConfigUrls.labels.map((url, indx) => (
                    <div key={indx} className="flex w-fit relative">
                        <AgenrapLinkButton variant={"brownlinkrap"} hrefLink={['expediente', 'servicos'].includes(url.url) ? url.url + `?bns=${res.name}` : url.url}>
                            {url.view}
                        </AgenrapLinkButton>
                    </div>
                ))
                }
            </AgenrapHeader>
            <ConfigWeeksForm />

        </>
    )
} 