import { Metadata } from "next";
import AgenrapSidebar from "../../shared/components/agenrap-ui/sidebar/AgenrapSideBar";
import { SidebarInset, SidebarProvider } from "../../shared/components/ui/sidebar";
import AgenrapHeader from "../../shared/components/agenrap-ui/header/AgenrapHeader";
import RapAuthForm from "../../features/auth/components/RapAuthForm";
import Image from "next/image";
import { macroLogo, verifyMediumIcon } from "../../assets/images";



export const metadata: Metadata = {
    title: "Login | Agenrap",
    description: "Faça seu Login"
};

export default function RegisterPage() {
    return (
        <main className="w-full h-full min-h-lvh   flex">
            <div className="w-[50%]  hidden lg:flex flex-col p-32 pl-7 bg-(--agenrap-brown-500)/75  ">
                <div className="flex gap-1">
                    <span className="w-1.75 h-full  bg-(--agenrap-yellow-200)"></span>
                    <div className="flex flex-col gap-y-1">
                        <p className="text-white font-tree font-bold lg:text-5xl text-2xl  ">Sua agenda te</p>
                        <p className="text-white font-tree font-bold lg:text-5xl text-2xl mb-2">espera</p>
                        <p className="text-white font-tree font-medium lg:text-xl text-lg ">Seus clientes marcam sozinhos, no horário que você</p>
                        <p className="text-white font-tree font-medium lg:text-xl text-lg">disponibiliza. Simples, rápido e sem bagunça na agenda.</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-center items-center absolute inset-0 -z-10">
                <Image src={macroLogo} alt="" fill className="" />
            </div>
            <div className="lg:w-[50%] w-full  flex flex-col items-center  bg-(--agenrap-gray-200) justify-center ">

                <div className="w-full flex justify-center">                    <Image src={verifyMediumIcon} alt="logo AGENRAP" className="w-[25%]  " /></div>
                <div className="w-fit gap-10 flex flex-col">

                    <h1 className="md:text-4xl text-2xl  font-cinzel text-center font-bold"><span className="font-tree font-semibold ">Entrando com</span> Agenrap</h1>
                    
                    <RapAuthForm isLogin={true} />
                </div>
            </div>

            {/* <SidebarProvider>
        <AgenrapSidebar color="#" />
        <SidebarInset>
          <AgenrapHeader />
           
        </SidebarInset>
      </SidebarProvider> */}
        </main>
    );
}
