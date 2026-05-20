"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import AgenrapButton from "../button/agenrap-button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

export function AgenrapPagination({ page, totalPages, hasNext, hasPrev }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function goTo(newPage: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(newPage))
        router.push(`${pathname}?${params.toString()}`)
    }

    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <AgenrapButton
                className="h-fit w-fit bg-transparent disabled:opacity-30"
                disabled={!hasPrev}
                onClick={() => goTo(page - 1)}
            >
                <ChevronLeft color="#BB77EE" />
            </AgenrapButton>

            <span className="text-sm font-tree text-(--agenrap-brown-500)/60">
                {page} de {totalPages}
            </span>

            <AgenrapButton
                className="h-fit w-fit bg-transparent disabled:opacity-30"
                disabled={!hasNext}
                onClick={() => goTo(page + 1)}
            >
                <ChevronRight color="#BB77EE" />
            </AgenrapButton>
        </div>
    )
}