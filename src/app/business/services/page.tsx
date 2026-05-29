import CreateOccupationForm from "@/src/features/business/components/initial-config-business/create-occupation-form/create-occcupation-form";
import { BusinessRes } from "@/src/features/business/types/business.types";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header";
import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/types/initial-business-config-urls";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { formatPublicHandle, normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
import { redirect } from "next/navigation";

export default async function CreateServicePage({
    searchParams
}: {
    searchParams: Promise<{ rap: string }>
}) {
    const { rap: bsnEncoded } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`)

    if (res && res.alreadyInitial) {
        redirect(`/dashboard?rap=${formatPublicHandle(bsnEncoded)}`);
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
                        <AgenrapLinkButton variant={"brownlinkrap"} hrefLink={['hours', 'services'].includes(url.url) ? url.url + `?rap=${res.atSign}` : url.url}>
                            {url.view}
                        </AgenrapLinkButton>
                    </div>
                ))}
            </AgenrapHeader>

            <div className="flex flex-col items-center mx-auto mt-12 mb-6 lg:w-[35%] md:w-[55%] w-[80%]">
                <div className="flex flex-col gap-2 mb-6 w-full">
                    <h1 className="lg:text-3xl md:text-2xl text-lg text-center font-tree font-semibold my-4 mb-6">
                        Configurando primeiros serviços
                    </h1>
                    <div className="flex flex-col">
                        <p className="font-tree font-medium md:text-xl text-lg">1. Fornecer o nome do serviço</p>
                        <div className="flex gap-1 mt-2 h-full w-full">
                            <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)" />
                            <div className="flex flex-col">
                                <p className="font-tree md:text-sm text-xs">O nome fornecido será o nome que seus clientes</p>
                                <p className="font-tree md:text-sm text-xs">podem selecionar para agendar</p>
                            </div>
                        </div>
                    </div>
                </div>

                {res.hasServices ? (
                    <div className="w-full flex flex-col">
                        <div className="bg-(--agenrap-brown-500) px-4 py-3 flex items-center justify-between">
                            <p className="font-tree font-bold text-sm text-white flex-1">Serviços configurados</p>
                            <span className="text-(--agenrap-yellow-200) font-tree text-xs font-semibold">✓ Concluído</span>
                        </div>
                        <div className="border border-(--agenrap-brown-500)/20 border-t-0 px-5 py-6 flex flex-col gap-3">
                            <p className="font-tree text-sm text-(--agenrap-brown-500)/70">
                                Seus serviços já foram cadastrados. Agora configure seu expediente para ativar a agenda.
                            </p>
                            <AgenrapLinkButton variant="brownlinkrap" hrefLink={`hours?rap=${res.atSign}`}>
                                Continuar para Expediente →
                            </AgenrapLinkButton>
                        </div>
                    </div>
                ) : (
                    <CreateOccupationForm />
                )}
            </div>
        </>
    )
}