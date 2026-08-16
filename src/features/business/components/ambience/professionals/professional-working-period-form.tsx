'use client'
import { useState } from "react"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"

import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { CreateProfessionalWorkingPeriod, ProfessionalWkPeriodReq } from "@/src/features/business/services"

const WEEK_DAYS = [
    { key: "SEG", label: "Segunda" },
    { key: "TER", label: "Terça" },
    { key: "QUA", label: "Quarta" },
    { key: "QUI", label: "Quinta" },
    { key: "SEX", label: "Sexta" },
    { key: "SAB", label: "Sábado" },
    { key: "DOM", label: "Domingo" },
]

type DayState = {
    active: boolean
    initial: string
    end: string
}

type Props = {
    professionalId: number
    onSuccess?: () => void
}

export default function ProfessionalWorkingPeriodForm({ professionalId, onSuccess }: Props) {
    const [days, setDays] = useState<Record<string, DayState>>(
        Object.fromEntries(WEEK_DAYS.map(d => [d.key, { active: false, initial: "08:00", end: "18:00" }]))
    )
    const [isPending, setIsPending] = useState(false)

    const toggleDay = (key: string) => {
        setDays(prev => ({ ...prev, [key]: { ...prev[key], active: !prev[key].active } }))
    }

    const updateTime = (key: string, field: "initial" | "end", value: string) => {
        setDays(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }))
    }

    const handleSubmit = async () => {
        const selected = Object.entries(days).filter(([, v]) => v.active)
        if (!selected.length) {
            toast.error("Selecione ao menos um dia!")
            return
        }

        const invalid = selected.find(([, v]) => v.initial >= v.end)
        if (invalid) {
            toast.error("Horário inicial precisa ser antes do horário final!")
            return
        }

        setIsPending(true)
        try {
            const payload: ProfessionalWkPeriodReq[] = selected.map(([key, v]) => ({
                week: key,
                initial: v.initial,
                end: v.end,
            }))
            const res = await CreateProfessionalWorkingPeriod(professionalId, payload)
            if (res.data == null) {
                toast.error(res.message || "Algo deu errado!")
            } else {
                toast.success(res.message || "Expediente cadastrado!")
                onSuccess?.()
            }
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Erro ao salvar expediente")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="flex flex-col gap-y-3 w-full">
            <p className="font-tree font-semibold text-lg text-white">Expediente do profissional</p>
            <div className="flex flex-col gap-y-2">
                {WEEK_DAYS.map(day => {
                    const state = days[day.key]
                    return (
                        <div key={day.key} className={`flex items-center gap-x-3 p-2.5 rounded-md ${state.active ? "bg-(--agenrap-purple-500)/20" : "bg-white/5"}`}>
                            <button
                                type="button"
                                onClick={() => toggleDay(day.key)}
                                className={`w-9 h-9 shrink-0 rounded-md flex items-center justify-center font-tree text-xs font-bold transition-colors ${state.active ? "bg-(--agenrap-purple-500) text-white" : "bg-white/10 text-white/50"}`}
                            >
                                {day.key}
                            </button>
                            <span className="font-tree text-sm text-white flex-1">{day.label}</span>
                            {state.active && (
                                <div className="flex items-center gap-x-1.5">
                                    <input
                                        type="time"
                                        value={state.initial}
                                        onChange={(e) => updateTime(day.key, "initial", e.target.value)}
                                        className="bg-white/10 text-white text-sm rounded-md px-2 py-1 font-tree outline-none"
                                    />
                                    <span className="text-white/40 text-xs">até</span>
                                    <input
                                        type="time"
                                        value={state.end}
                                        onChange={(e) => updateTime(day.key, "end", e.target.value)}
                                        className="bg-white/10 text-white text-sm rounded-md px-2 py-1 font-tree outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <AgenrapButton variant="purplerap" onClick={handleSubmit} className="w-full flex justify-center items-center mt-2">
                {isPending
                    ? <div className="flex relative">
                        <Image src={macroLogo} alt="" className="w-7 h-7 opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute w-7 h-7" color="#F5E6CC" />
                    </div>
                    : "Salvar expediente"
                }
            </AgenrapButton>
        </div>
    )
}