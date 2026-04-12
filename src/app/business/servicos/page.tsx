
import CreateOccupationForm from "@/src/features/business/components/InitialConfigBusiness/CreateOccupationForm/CreateOccupationForm";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { redirect } from "next/navigation";
export default async function CreateServicePage() {
    const res = await serverFetch('business/search-by-user')
    const targetBusiness = await res.json();
    if (targetBusiness.data == null) {
        if (targetBusiness.data.alreadyInitial) {
            redirect(`/home`);
        } else {
            redirect(`/business/meu-link`);
        }
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
            <div className="flex flex-col itens-center mx-auto mt-12 mb-6 lg:w-[35%] md:w-[55%] w-[80%] ">
                <div className="flex flex-col gap-2 mb-6">
                    <h1 className=" lg:text-3xl md:text-2xl text-lg text-center  font-tree font-semibold my-4 mb-6">Configurando primeiros serviços</h1>
                    <div className="flex flex-col">
                        <p className=" font-tree font-medium md:text-xl text-lg ">1. Fornecer o nome do serviço</p>
                        <div className="flex gap-1 mt-2  h-full w-full">
                            <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)"></span>
                            <div className="flex flex-col ">
                                <p className="font-tree md:text-sm text-xs">O nome fornecido será o nome  que seus clientes</p>
                                <p className="font-tree md:text-sm text-xs">podem selecionar para agendar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <CreateOccupationForm />
            </div>

        </>
    )
} 