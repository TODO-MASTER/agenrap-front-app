"use client"

import Image from "next/image"
import { LoaderCircle } from "lucide-react"
import { macroLogo } from "@/src/assets/images"

type Props = {
    label?: string
}

export default function AgenrapLoadingSplash({ label = "Carregando sua página..." }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--agenrap-gray-200)">
            <div className="flex flex-col items-center gap-4">
                <div className="flex relative animate-pulse">
                    <Image src={macroLogo} alt="" className="w-50 h-50  " priority />
                    <LoaderCircle className="animate-spin absolute w-50 h-50" color="var(--agenrap-brown-200)" />
                </div>
                <p className="font-tree text-lg text-(--agenrap-gray-800) animate-pulse">
                    {label}
                </p>
            </div>
        </div>
    )
}