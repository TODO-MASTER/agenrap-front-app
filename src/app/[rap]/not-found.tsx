import Link from "next/link"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { CalendarX2, ArrowRight } from "lucide-react"

export default function BusinessNotFound() {
    return (
        <main className="relative flex min-h-lvh w-full flex-col items-center justify-center overflow-hidden bg-(--agenrap-gray-800) px-6 py-24">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
                <Image src={macroLogo} alt="" fill className="object-contain" />
            </div>

            <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-(--agenrap-purple-500)/25 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[380px] w-[380px] rounded-full bg-(--agenrap-yellow-200)/10 blur-[120px]" />

            <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-y-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--agenrap-yellow-200)/10 border border-(--agenrap-yellow-200)/20">
                    <CalendarX2 size={28} className="text-(--agenrap-yellow-200)" />
                </span>

                <h1 className="font-cinzel text-3xl font-bold text-white md:text-4xl">
                    Negócio não encontrado
                </h1>

                <p className="max-w-sm font-tree text-sm leading-relaxed text-white/60 md:text-base">
                    O @rap que você acessou não existe ou foi removido. Confira o link com quem te enviou.
                </p>

                <Link
                    href="/"
                    className="mt-2 flex items-center gap-2 rounded-md bg-(--agenrap-purple-500) px-8 py-3.5 font-tree font-bold text-white transition-colors hover:bg-(--agenrap-purple-500)/85"
                >
                    Ir para o início
                    <ArrowRight size={18} />
                </Link>
            </div>
        </main>
    )
}