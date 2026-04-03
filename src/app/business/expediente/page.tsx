import ConfigWeeksSection from "@/src/features/business/components/InitialConfigBusiness/ConfigWeeksSection/ConfigWeeksSection";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";

import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { serverFetch } from "@/src/shared/lib/serverFetch";

export default async function BusinessInitialConfigPage() {
    const res = await serverFetch('business/search-by-user')
    const targetBusiness = await res.json();

  
    return (
        <>
            <AgenrapHeader isDefault={true}>
                {initialBusinessConfigUrls.labels.map((url, indx) => (
                    <div key={indx} className="flex w-fit relative">
                    <AgenrapLinkButton  variant={"brownlinkrap"} hrefLink={url.url}>
                        {url.view}
                    </AgenrapLinkButton>
                    </div>
                ))
                }
            </AgenrapHeader>
            <ConfigWeeksSection />
           
        </>
    )
} 