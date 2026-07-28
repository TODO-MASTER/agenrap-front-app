'use client'
import { macroLogo } from "@/src/assets/images"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapNfmInput from "@/src/shared/components/agenrap-ui/input/agenrap-nfm-input"
import {HandPlatter, LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCustomerActions } from "../../hooks/use-customer-actions"
import { BusinessCtx } from "@/src/shared/types"
import { LogoutButton } from "@/src/shared/components/agenrap-ui/button/logout-button"
import { useBusinessSearch } from "@/src/features/customers/hooks/use-search-business"



export default function ScheduleEntrance() {
    const { handleJoinScheduleByRap, isJoinPending } = useCustomerActions()
    const [query, setQuery] = useState("")
    const [selectedAtSign, setSelectedAtSign] = useState<string | null>(null)
    const { results, isSearching } = useBusinessSearch(query)

    const isDisabled = !selectedAtSign || isJoinPending

    return (
        <div className="flex flex-col gap-y-2 w-full">
            <AgenrapNfmInput
                label="Nome do Serviço"
                autoComplete="off"
                placeholder="Ex. Salão Agenrap"
                left
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedAtSign(null)
                }}
                icon={<HandPlatter size={25} />}
            />

            {isSearching && (
                <p className="font-tree text-xs opacity-60">Buscando...</p>
            )}

            {!isSearching && query.trim().length >= 2 && results.length === 0 && (
                <p className="w-full p-2 rounded-md text-black font-tree bg-(--agenrap-blue-500)/50">Não encontrado</p>
            )}

            {!isSearching && results.length > 0 && !selectedAtSign && (
                <div className="flex flex-col gap-1.5">
                    {results.map((r) => (
                        <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                                setSelectedAtSign(r.atSign)
                                setQuery(r.name)
                            }}
                            className="text-left p-2 rounded-md font-tree bg-(--agenrap-yellow-200) hover:bg-(--agenrap-yellow-200)/80 transition-colors"
                        >
                            {r.name} <span className="opacity-60 text-sm">@{r.atSign}</span>
                        </button>
                    ))}
                </div>
            )}

            {selectedAtSign && (
                <AgenrapButton
                    className={`${isDisabled ? "opacity-50 cursor-not-allowed" : ""} flex justify-center items-center`}
                    disabled={isDisabled}
                    onClick={() => handleJoinScheduleByRap(selectedAtSign)}
                >
                    {isJoinPending ? (
                        <div className="flex relative">
                            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                    ) : (
                        <p className="font-tree">Ingressar</p>
                    )}
                </AgenrapButton>
            )}

            <div className="flex fixed bottom-6 left-6 z-50">
                <LogoutButton />
            </div>
        </div>
    )
}