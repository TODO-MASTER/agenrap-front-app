import { miniIcon } from "@/src/assets/images";
import AgenrapChooseProfileButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-chose-profile-button";
import { Building2, DoorOpen, Gem } from "lucide-react";
import Image from "next/image";

export default async function WelcomePage() {
    return (
        <main className="w-full min-h-dvh mx-auto flex flex-col items-center pt-12 bg-(--agenrap-gray-200)/15 h-full">
            <div className="flex gap-x-2 py-4 justify-center items-center">
<Image 
    src={miniIcon} 
    alt="icone da logo Agenrap" 
    width={100} 
    height={100} 
    className="w-18.75 h-18.75 md:w-25 md:h-25" 
/>
                <p className="font-cinzel md:text-3xl text-xl font-bold">Agenrap</p>
            </div>
            <p className="font-tree md:text-2xl text-lg font-semibold">Olá, o que você deseja no <span className="font-cinzel font-bold">Agenrap</span> ?</p>
            <div className="w-full flex flex-wrap md:flex-nowrap py-8 lg:px-16 md:px-8  gap-8 justify-center items-center h-full">
                <AgenrapChooseProfileButton variant={"pictureHangerRap"} hrefLink="/register?cmd=Y" className="lg:w-[35%] md:w-[55%]  w-[75%] px-4 py-2">

                    <DoorOpen size={100} className="opacity-75" />
                    <p className="font-tree font-medium text-sm ">Procura agendar em um negócio</p>
                </AgenrapChooseProfileButton>
                <AgenrapChooseProfileButton variant={"pictureHangerRap"} hrefLink="/register?cmd=N" className="lg:w-[35%] md:w-[55%] relative  w-[75%] px-4 py-2">
                    <Gem className="absolute inset-0 ml-5 mt-3" color="#BB77EE" size={25}/>
                    <Building2 size={100} className="opacity-75" />
                    <p className="font-tree font-medium text-sm">Meu negócio precisa de um agendamento</p>
                </AgenrapChooseProfileButton>
            </div>
        </main>
    )
}