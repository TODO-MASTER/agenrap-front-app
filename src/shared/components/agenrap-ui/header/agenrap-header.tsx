'use client'
import AgenrapButton from "../button/agenrap-button"
import { SidebarTrigger } from "../../ui/sidebar"
import Image from "next/image"
import { miniIcon } from "@/src/assets/images"
import AgenrapMenuBar from "../menu/agenrap-menu-bar"
import { LucideLogOut } from "lucide-react"
import Link from "next/link"
import { HeaderSettings } from "@/src/shared/components/agenrap-ui/header/header-settings.type"

import { AgenrapSegmentedControl } from "../button/agenrap-segment-button"
import { useHeaderSegments } from "@/src/providers/header-segments-provider"
interface AgenrapHeaderProps extends HeaderSettings {
    isScrolled?: boolean
}

export default function AgenrapHeader({ isDefault, children, isScrolled = false }: AgenrapHeaderProps) {
    const context = useHeaderSegments()
const segments = isDefault ? [] : context?.segments??[]
    return (isDefault ?
        <header className="flex items-center justify-between w-full bg-(--agenrap-brown-200) px-1 py-2">
            <div className="flex md:justify-between md:gap-0 gap-1 w-full items-center">
                <div className="flex items-center">
                    <Image src={miniIcon} alt="logo da marca" className="w-13 h-13" />
                    <AgenrapMenuBar>
                        {children}
                    </AgenrapMenuBar>
                </div>
                <Link href="/login" className="md:block hidden">
                    <AgenrapButton variant="brownLogoutrap">
                        <LucideLogOut color="#000" width={20} height={20} />
                    </AgenrapButton>
                </Link>
            </div>
        </header>
        :

        <menu className={`flex flex-col w-full z-40 ${segments.length > 0 ? "mb-10 md:mb-4 lg:mb-0" : "mb-16 md:mb-8 lg:mb-0"}`}>

            {/* Div principal: fixed o tempo todo no mobile, evitando o loop de colapso de altura */}
            <div className={`fixed top-0 left-0 right-0 lg:hidden w-full flex flex-col transition-all duration-300 z-50 ${isScrolled
                    ? "bg-(--agenrap-brown-200)/65 backdrop-blur-md border-b border-black/5 shadow-sm"
                    : "bg-(--agenrap-brown-200) border-b border-b-black"
                }`}>
                <div className="flex w-full items-center justify-between h-20 px-4">
                    <div className="flex items-center gap-x-1">
                        <Image src={miniIcon} alt="logo" className="w-10" />
                        <p className="font-cinzel font-bold">Agenrap</p>
                        <SidebarTrigger />
                    </div>
                    <Link href="/login">
                        <button className="p-2 rounded-md hover:bg-black/5 active:bg-black/10 transition-colors">
                            <LucideLogOut color="#000" width={20} height={20} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Bloco de segmentos: Acompanha o posicionamento do pai perfeitamente sem glitar */}
            {segments.length > 0 && (
                <div className={`fixed left-0 right-0 flex w-full md:hidden transition-all duration-300 z-40 top-20 ${isScrolled
                        ? "bg-(--agenrap-brown-200)/65 backdrop-blur-md border-b border-black/5 shadow-sm"
                        : "bg-(--agenrap-brown-200) border-b border-b-black"
                    }`}>
                    <AgenrapSegmentedControl segments={segments} />
                </div>
            )}
        </menu>


    )
}