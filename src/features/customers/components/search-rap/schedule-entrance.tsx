'use client'
import { macroLogo } from "@/src/assets/images"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapNfmInput from "@/src/shared/components/agenrap-ui/input/agenrap-nfm-input"
import { LoaderCircle, Search, Store } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCustomerActions } from "../../hooks/use-customer-actions"
import { useBusinessSearch } from "@/src/features/customers/hooks/use-search-business"

export default function ScheduleEntrance() {
    const { handleJoinScheduleByRap, isJoinPending } = useCustomerActions()
    const [query, setQuery] = useState("")
    const [selectedAtSign, setSelectedAtSign] = useState<string | null>(null)
    const { results, isSearching } = useBusinessSearch(query)

    const isDisabled = !selectedAtSign || isJoinPending
    const hasQuery = query.trim().length >= 2

    return (
        <div className="flex flex-col w-full max-w-md rounded-md overflow-hidden shadow-md">
            <div className="bg-(--agenrap-gray-800) px-6 py-5 flex flex-col gap-y-1">
                <h4 className="font-tree text-2xl font-bold text-(--agenrap-yellow-200)">
                    Encontre um estabelecimento
                </h4>
                <p className="font-tree text-sm text-white/60">
                    Digite o nome para entrar na agenda de atendimento
                </p>
            </div>

            <div className="bg-(--agenrap-brown-500)/10 px-6 py-6 flex flex-col gap-y-4">
                <AgenrapNfmInput
                    label="Nome do estabelecimento"
                    autoComplete="off"
                    placeholder="Ex. Salão Agenrap"
                    left
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setSelectedAtSign(null)
                    }}
                    icon={<Search size={22} />}
                />

                {!hasQuery && (
                    <div className="flex flex-col items-center gap-y-2 py-6 opacity-50">
                        <Store size={36} className="text-(--agenrap-brown-500)" />
                        <p className="font-tree text-sm text-center text-(--agenrap-brown-500)">
                            Digite ao menos 2 letras para começar a busca
                        </p>
                    </div>
                )}

                {isSearching && (
                    <p className="font-tree text-xs text-(--agenrap-brown-500)/60">Buscando...</p>
                )}

                {!isSearching && hasQuery && results.length === 0 && (
                    <p className="w-full p-3 rounded-md text-center text-(--agenrap-brown-500) font-tree text-sm bg-(--agenrap-blue-500)/20 border border-(--agenrap-blue-500)/30">
                        Nenhum estabelecimento encontrado com esse nome
                    </p>
                )}

                {!isSearching && results.length > 0 && !selectedAtSign && (
                    <div className="flex flex-col gap-2">
                        {results.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => {
                                    setSelectedAtSign(r.atSign)
                                    setQuery(r.name)
                                }}
                                className="flex items-center gap-x-3 text-left p-3 rounded-md font-tree bg-(--agenrap-yellow-200)/50 hover:bg-(--agenrap-yellow-200)/80 border border-(--agenrap-purple-500)/30 transition-colors"
                            >
                                <div className="w-9 h-9 shrink-0 rounded-full bg-(--agenrap-purple-500) text-white flex items-center justify-center text-xs font-bold">
                                    {r.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-(--agenrap-brown-500)">{r.name}</span>
                                    <span className="text-(--agenrap-brown-500)/60 text-xs">@{r.atSign}</span>
                                </div>
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
            </div>
        </div>
    )
}