'use client'

import { ScrollHint } from "@/src/features/customers/components/service-showcase/showcase-section/scroll-hint"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { LogoutButton } from "@/src/shared/components/agenrap-ui/button/logout-button"
import { ArrowLeft, Scissors } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ServiceShowcaseHeader({ name }: { name: string }) {
    const router = useRouter()

    return (
        <header className="w-full flex flex-col select-none relative overflow-hidden">
            <div className="w-full bg-(--agenrap-brown-500) text-(--agenrap-pure-white) relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 py-8 md:py-16 flex flex-row items-center justify-between gap-6 relative overflow-visible">

                    <div className="space-y-1.5 text-left z-10">
                        <p className="font-tree text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-(--agenrap-pure-white)">
                            Olá, sou {name}!
                        </p>
                        <p className="text-(--agenrap-brown-200) text-sm md:text-base font-medium opacity-90">
                            Escolha um serviço abaixo para agendar seu horário.
                        </p>
                    </div>

                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 items-center justify-center z-0 pointer-events-none">
                        <div className="w-48 h-48 lg:w-128 lg:h-128 rounded-full border-8 border-(--agenrap-yellow-200) opacity-10 flex items-center justify-center -rotate-12 transform scale-110">
                            <Scissors className="w-24 h-24 lg:w-32 lg:h-32 rotate-45 stroke-[2]" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full h-1.5 flex relative z-10">
                <div className="flex-1 bg-(--agenrap-purple-500)" />
                <div className="flex-1 bg-(--agenrap-pure-white)" />
                <div className="flex-1 bg-(--agenrap-yellow-200)" />
            </div>

            <div className="w-full bg-[#9C4B08] border-b border-(--agenrap-brown-500)/30 py-3 px-6 shadow-sm relative z-10">
                <div className="max-w-6xl mx-auto flex items-center">
                    <AgenrapButton
                        variant="brownLogoutrap"
                        onClick={() => router.push("/appointments")}
                        className="flex items-center gap-2.5 text-sm md:text-base text-(--agenrap-brown-200) hover:text-(--agenrap-pure-white) transition-all duration-200 font-medium py-1.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-md"
                    >
                        <ArrowLeft size={18} className="stroke-[2.5]" />
                        <span>Voltar para agendas</span>
                    </AgenrapButton>
                </div>
             

            </div>
                              <div className="
                                           flex
                                          fixed bottom-6 left-6 z-50
                                        ">
                                            <LogoutButton  />
                                          
                                        </div>
                                              <div className="pt-2 pb-2 fixed z-40 right-[5%] top-[40%] md:top-[50%]  ">
                <ScrollHint targetId="meus-servicos" />
            </div>
        </header>
    )
}