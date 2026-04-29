
import ConfigWeeksForm from "@/src/features/business/components/InitialConfigBusiness/ConfigWeeksForm/ConfigWeeksForm";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";

import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { redirect } from "next/navigation";


export default async function BusinessInitialConfigPage({
    searchParams
}: {
    searchParams: Promise<{ bns:string }>
})  {
      const {bns:bsn } = await searchParams
    const res = await serverFetch<IBusinessRes>(`business/search-by-user?businessName=${bsn}`)
        if (res&&res.alreadyInitial) {
            redirect(`/home?bns=${bsn}`);
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