"use client"

import { CalendarDays, CheckCircle2, Clock } from "lucide-react"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapNfmInput from "@/src/shared/components/agenrap-ui/input/agenrap-nfm-input"

type BlockKind = "day" | "time"

type Props = {
    blockKind: BlockKind
    reason: string
    setReason: (v: string) => void
    selectedStart?: string
    selectedEnd?: string
    loading: boolean
    timeError?: string
    onConfirm: (e: React.FormEvent) => void
}

export default function RangeTurnDetailsPanel({
    blockKind, reason, setReason, selectedStart, selectedEnd, loading, timeError, onConfirm,
}: Props) {
    return (
        <div className="lg:col-span-5 bg-(--agenrap-gray-800) border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-y-6 h-fit lg:h-full">
            <div className="flex flex-col gap-y-5">
                <div>
                    <h2 className="text-[15px] font-semibold text-(--agenrap-yellow-200) tracking-tight font-tree">
                        {blockKind === "day" ? "Detalhes da Folga" : "Detalhes do Bloqueio"}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        {blockKind === "day"
                            ? "O sistema suspenderá automaticamente os agendamentos durante o intervalo selecionado."
                            : "Esse horário ficará indisponível todos os dias, com o motivo visível ao cliente."}
                    </p>
                </div>

                <div className="h-px bg-white/5" />

                <AgenrapNfmInput
                    id="block-reason"
                    variant="cyberYellowRap"
                    label="Motivo do Bloqueio"
                    placeholder={blockKind === "day" ? "Ex: Recesso, Emenda, Treinamento..." : "Ex: Almoço, Intervalo..."}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    removeFormMessage
                />

                {timeError && (
                    <p className="text-xs text-red-400 font-tree -mt-2">{timeError}</p>
                )}

                {selectedStart && (
                    <div className="flex flex-col gap-y-1.5 bg-(--agenrap-brown-500)/20 border border-(--agenrap-yellow-200)/15 rounded-xl p-4">
                        <div className="flex items-center gap-x-2 mb-1">
                            {blockKind === "day"
                                ? <CalendarDays size={13} className="text-(--agenrap-yellow-200)" />
                                : <Clock size={13} className="text-(--agenrap-yellow-200)" />
                            }
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-(--agenrap-yellow-200)">
                                {blockKind === "day" ? "Dias selecionados" : "Horário selecionado"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500">{blockKind === "day" ? "Início" : "Das"}</span>
                            <span className="text-xs font-semibold text-white">{selectedStart}{blockKind === "time" && "h"}</span>
                        </div>
                        {selectedEnd && selectedEnd !== selectedStart && (
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500">{blockKind === "day" ? "Fim" : "Às"}</span>
                                <span className="text-xs font-semibold text-white">{selectedEnd}{blockKind === "time" && "h"}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-y-3">
                <div className="h-px bg-white/5" />
                <AgenrapButton
                    variant="purplerap"
                    type="button"
                    onClick={onConfirm}
                    disabled={loading || !reason.trim()}
                    className="w-full flex justify-center items-center gap-x-2 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CheckCircle2 size={17} />
                    <span className="font-tree text-sm font-semibold">
                        {loading ? "Processando..." : "Confirmar Bloqueio"}
                    </span>
                </AgenrapButton>
            </div>
        </div>
    )
}