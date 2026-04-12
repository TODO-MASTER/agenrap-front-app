
import ConfigWeeksForm from "@/src/features/business/components/InitialConfigBusiness/ConfigWeeksForm/ConfigWeeksForm";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";

import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { redirect } from "next/navigation";


export default async function BusinessInitialConfigPage() {
    const res = await serverFetch('business/search-by-user')
    const targetBusiness = await res.json();

        if (targetBusiness.data&&targetBusiness.data.alreadyInitial) {
            redirect(`/home`);
        }else if (!targetBusiness.data) {
            const msg = Buffer.from('Primeiro nomeie seu negócio').toString('base64')
            redirect(`/business/meu-link?flash=${msg}`)
        }
    
    return (
        <>
            <AgenrapHeader isDefault={true}>
                {initialBusinessConfigUrls.labels.map((url, indx) => (
                    <div key={indx} className="flex w-fit relative">
                        <AgenrapLinkButton variant={"brownlinkrap"} hrefLink={['expediente', 'servicos'].includes(url.url) ? url.url + `?bns=${targetBusiness.data.name}` : url.url}>
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