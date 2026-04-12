import AgenrapButton from "../button/AgenrapButton";
import { SidebarTrigger } from "../../ui/sidebar";
import Image from "next/image";
import { miniIcon } from "@/src/assets/images";
import AgenrapMenuBar from "../menu/AgenrapMenuBar";

import { IHeaderSettings } from "./IHeaderSettings";
import { LucideLogOut } from "lucide-react";
import Link from "next/link";




export default function AgenrapHeader({ isDefault, children }: IHeaderSettings) {
    return (isDefault ?

        <header className="flex items-center  justify-between w-full bg-(--agenrap-brown-200) p-4 ">
            <div className="flex md:justify-between md:gap-0 gap-1 w-full items-center">
                <div className="flex items-center">
                    <Image src={miniIcon} alt="logo da marca" className="w-13 h-13" />
                    <AgenrapMenuBar>
                        {children}
                    </AgenrapMenuBar>
                </div>
                <Link href={"/login"} className="md:block hidden">
                    <AgenrapButton variant={"brownLogoutrap"} >
                        <LucideLogOut color="#000" width={20} height={20} />
                    </AgenrapButton>
                </Link>
            </div>


        </header> :
        <menu className="flex w-full bg-(--agenrap-brown-200) h-20 border-b border-b-black ">
            <SidebarTrigger />
        </menu>
    )
}