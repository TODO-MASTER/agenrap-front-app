import { calytraPureLogo, calytraPureType, macroLogo, verifyMediumIcon } from "@/src/assets/images";
import { environments } from "@/src/environments/environments";
import RetryVerifyEmailButton from "@/src/features/auth/components/button/retry-verify-email-button";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { HeartHandshake, LoaderCircle, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";




export const metadata: Metadata = {
    title: "Verificação de email | Agenrap",
    description: "Automatize sua agenda"
};

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
    const { token } = await searchParams

    if (!token) return <div className="flex justify-center items-center text-2xl font-tree">token inválido</div>


    const response = await fetch(environments.apiUrl + `smtp/verify-email?token=${token}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });;

    if (!response.ok) return <main className="w-full h-full min-h-lvh justify-center   flex">
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center ">
                <Image src={verifyMediumIcon} alt="logo AGENRAP" className="w-full  " />
            </div>
            <h1 className="text-2xl font-tree font-bold">Ocorreu algum erro.</h1>
            <div className="flex flex-col">
                <RetryVerifyEmailButton token={token} />
                <div className="flex gap-x-0.5 justify-end items-center py-1">
                    <ShieldCheck width={25} height={25} color="#2563EB" />
                    <Image src={calytraPureType} alt="calytra protection" className=" w-25" />
                </div>
            </div>

        </div>

    </main>

    return <main className="w-full h-full min-h-lvh justify-center   flex">
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center ">
                <Image src={verifyMediumIcon} alt="logo AGENRAP" className="w-full " />
            </div>
            <h1 className="text-2xl font-tree font-bold">Usuário Verificado</h1>
            <div className="flex flex-col">
                <AgenrapButton
                    asChild
                    className="flex justify-center items-center w-full px-12 mt-2 mb-0.5"
                >
                    <Link href="/login">Página de Login</Link>
                </AgenrapButton>
                <div className="flex gap-x-0.5 justify-end items-center py-1">
                    <ShieldCheck width={25} height={25} color="#2563EB" />
                    <Image src={calytraPureType} alt="calytra protection" className=" w-25" />
                </div>
            </div>

        </div>

    </main>
}


