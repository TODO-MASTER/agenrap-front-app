import Image from "next/image";
import { calytraPureLogo, macroLogo, verifyEmailIcon, calytraPureType } from "../../assets/images";
import { HeartHandshake, ShieldCheck } from "lucide-react";

export default function VerifyEmailPage() {

    return (
        <main className="w-full h-full min-h-lvh justify-center   flex">
            <div className="flex flex-col justify-center items-center w-[80%]">
                <div className="flex items-center justify-center ">
                    <Image src={calytraPureLogo} alt="logo da Calytra" className="w-16 h-16" />
                    <HeartHandshake width={35} height={35} color="#2563EB" />
                    <Image src={macroLogo} alt="logo AGENRAP" className="w-12 h-12 " />
                </div>
                <h1 className="text-2xl font-tree font-bold">Verifique seu Email</h1>
                <div className="flex flex-col">
                    <Image src={verifyEmailIcon} alt="icone referente a verificar o email" />
                    <div className="flex gap-x-0.5 justify-end items-center py-1">
                        <ShieldCheck width={25} height={25} color="#2563EB" />
                        <Image src={calytraPureType} alt="calytra protection" className=" w-25" />
                    </div>
                </div>

            </div>

        </main>
    );
}