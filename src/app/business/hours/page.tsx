
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
    const hasWorkingPeriods = res.hasWorkingPeriods
    console.log(res)
    
    return (
        <>
            <AgenrapHeader isDefault={true}>
                {initialBusinessConfigUrls.labels.map((url, indx) => (
                    <div key={indx} className="flex w-fit relative">
                        <AgenrapLinkButton variant={"brownlinkrap"} hrefLink={['hours', 'services'].includes(url.url) ? url.url + `?bns=${res.name}` : url.url}>
                            {url.view}
                        </AgenrapLinkButton>
                    </div>
                ))
                }
            </AgenrapHeader>
{hasWorkingPeriods ? (
    <div className="flex flex-col lg:w-[35%] md:w-[55%] w-[80%] mx-auto mt-10 gap-6">
        <h1 className="lg:text-3xl md:text-2xl text-lg text-center font-tree font-bold">
            Definindo informações de expediente
        </h1>
        <div className="flex flex-col">
            <div className="bg-(--agenrap-brown-500) px-4 py-3 flex items-center gap-2">
                <p className="font-tree font-bold text-sm text-white flex-1">Expediente configurado</p>
                <span className="text-(--agenrap-yellow-200) font-tree text-xs font-semibold">✓ Concluído</span>
            </div>
            <div className="border border-(--agenrap-brown-500)/20 border-t-0 px-5 py-6 flex flex-col gap-3">
                <p className="font-tree text-sm text-(--agenrap-brown-500)/70">
                    Seus dias e horários de atendimento já foram salvos. O próximo passo é cadastrar seus serviços para ativar a agenda.
                </p>
                <AgenrapLinkButton variant="brownlinkrap" hrefLink={`services?bns=${res.name}`}>
                    Continuar para Serviços →
                </AgenrapLinkButton>
            </div>
        </div>
    </div>
) : (
    <ConfigWeeksForm />
)}

        </>
    )
} 