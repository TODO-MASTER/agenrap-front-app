import { macroLogo } from "@/src/assets/images";
import InitialConfigNameForm from "@/src/features/business/components/InitialConfigBusiness/InititalConfigNameForm/InitialConfigNameForm";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { ToastGuider } from "@/src/shared/components/agenrap-ui/toast/ToastGuider";
import {IBusinessRes } from "@/src/shared/interfaces/responses/IBusinessRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import {LucideLogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateBusinessPage({
    searchParams
}: {
    searchParams: Promise<{ flash?: string }>
}) {

    const { flash: encoded } = await searchParams
    const flash = encoded ? Buffer.from(encoded, 'base64').toString() : null
    const res = await serverFetch<IBusinessRes[]>(`business/search-all-business`)

            if (res.length==1&&res[0].alreadyInitial) {
                redirect(`/dashboard?bns=${res[0].name}`);
            }
            else if (res.length==1) {
            redirect(`/business/hours?bns=${res[0].name}`)
        }

    return (
        <>
            {flash && <ToastGuider message={flash} />}
            <AgenrapHeader isDefault={true}>
                {initialBusinessConfigUrls.labels.map((url, indx) => (
                    <div key={indx} className="flex w-fit relative">
                        <AgenrapLinkButton variant={"brownlinkrap"} hrefLink={url.url}>
                            {url.view}
                        </AgenrapLinkButton>
                    </div>
                ))
                }
            </AgenrapHeader>
            {res.length == 0 ?
                <InitialConfigNameForm /> :
                <div className="flex flex-col mx-auto lg:w-[35%] md:w-[55%] w-[90%] my-2">
                    <div className="flex flex-col gap-2">
                        <h1 className=" lg:text-2xl  text-xl text-center  font-tree font-bold my-8">Escolha um negócio para começar</h1>
                        {res.map(c => (
                            <Link href={`/business/hours?bns=${c.name}`} key={c.id} className="bg-(--agenrap-gray-800)   w-full flex justify-between h-16 items-center group hover:bg-(--agenrap-gray-800)/85  transition-colors duration-200 font-tree">
                                <p className="text-white  pl-4 py-8">{c.name}</p>
                                <div className="h-full w-[25%] flex justify-end bg-(--agenrap-purple-500) group-hover:bg-(--agenrap-purple-500)/85 border-l-4 border-(--agenrap-brown-200)/35 group-hover:border-0">
                                    <div className="h-full w-[55%] self-end flex bg-(--agenrap-brown-500) group-hover:bg-(--agenrap-brown-500)/85 border-l-4 border-(--agenrap-brown-200)/15 group-hover:border-0">

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
            <div className="md:hidden block  absolute bottom-0 right-0 -rotate-180">
                <Link href={"/login"} className="">
                    <AgenrapButton variant={"brownLogoutrap"} >
                        <LucideLogOut color="#000" width={20} height={20} />
                    </AgenrapButton>
                </Link>
            </div>
        </>
    )

} 