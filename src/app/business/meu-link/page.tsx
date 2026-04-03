import { macroLogo } from "@/src/assets/images";
import InitialConfigBusiness from "@/src/features/business/components/InitialConfigBusiness/InititalConfigBusinessForm/InitialConfigBusinessForm";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/AgenrapHeader";
import { initialBusinessConfigUrls } from "@/src/shared/components/agenrap-ui/menu/interfaces/IInitialBusinessConfigUrls";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { LoaderCircle, LucideLogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateBusinessPage() {
    const res = await serverFetch('business/search-by-user')
    const targetBusiness = await res.json();
    if (targetBusiness.data != null) {
        redirect('/business/expediente');
    }
    return (
        <>
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
            {targetBusiness.data != null ?
                <div className="flex flex-col mx-auto my-5 gap-y-26 text-center lg:w-[35%] md:w-[55%] w-[80%] ">
                    <p className="font-tree md:text-3xl text-lg font-semibold text-center ">Redirecionando para expediente...</p>
                    <AgenrapButton type="submit" variant={"purplerap"} disabled={true} className={`cursor-not-allowed flex justify-center bg-transparent w-full items-center`}>

                        <Image src={macroLogo} alt="" className="w-22 h-22 opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute w-22 h-22" color="#F5E6CC" />
                    </AgenrapButton >
                </div > :
                <InitialConfigBusiness />
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