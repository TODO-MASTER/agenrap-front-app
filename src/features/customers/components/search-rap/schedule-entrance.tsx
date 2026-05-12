'use client'
import { macroLogo } from "@/src/assets/images"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapNfmInput from "@/src/shared/components/agenrap-ui/input/agenrap-nfm-input"
import {HandPlatter, LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCustomerActions } from "../../hooks/use-customer-actions"
import { BusinessCtx } from "@/src/shared/types"

function getError(value: string): string | null {
    const raw = value.replace(/^@/, "")
    if (raw.length === 0) return null
    if (raw.length < 2) return "Mínimo dois caracteres após o @"
    if (/[A-Z]/.test(raw)) return "Use apenas letras minúsculas"
    if (/[^a-z0-9-]/.test(raw)) return "Use apenas letras, números e hífens"
    return null
}

export default function ScheduleEntrance() {
    const { handleJoinScheduleByRap, handleSearchByRap, isGetOnePending, isJoinPending } = useCustomerActions()
    const [value, setValue] = useState<string>("")
    const error = getError(value)
    const isValid = !error && value.length > 1
    const [searchBsn, setSearchBsn] = useState<BusinessCtx | null | 'not-init'>('not-init')
    const isDisabled = !isValid || isJoinPending


    return (
        <div className="flex flex-col gap-y-2 w-full">
            <AgenrapNfmInput
                label="Nome do Serviço"
                autoComplete="off"
                placeholder="Ex. @agenrap-servico"
                left
                value={value.length>0? "@" + (value?.replace(/^@/, "") ?? ""):""}
                onChange={(e) => {
                    const raw = e.target.value
                        .replace(/^@/, "")
                        .replace(/\s+/g, "-")
                        .replace(/[^a-zA-Z0-9-]/g, "")
                    setValue("@" + raw)
                }}
                icon={<HandPlatter size={25}/>}
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
             {searchBsn != 'not-init' && searchBsn && <p className="w-full p-2 rounded-md text-black font-tree bg-(--agenrap-yellow-200)">Encontrado - {searchBsn.mnrName}</p>}
            {searchBsn  && !isDisabled ? <AgenrapButton

                className={`${isDisabled ? "opacity-50 cursor-not-allowed" : ""} flex justify-center items-center`}
                disabled={ isDisabled}
                onClick={() => handleJoinScheduleByRap(value)}
            >
                {isJoinPending ? <div className="flex relative" >
                    <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                    <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                </div> : <p className="font-tree">{searchBsn?"Ingressar":"Não Encontrado"}</p>}
            </AgenrapButton> : searchBsn == null && <p className="w-full p-2 rounded-md text-black font-tree bg-(--agenrap-blue-500)/50">Não encontrado</p>}
        </div>
    )
}