"use client"

import { Clock } from "lucide-react"

type Props = {
    timeStart: string
    timeEnd: string
    setTimeStart: (v: string) => void
    setTimeEnd: (v: string) => void
    errors?: { start?: string; end?: string }
}

export default function RangeTurnTimeEditor({ timeStart, timeEnd, setTimeStart, setTimeEnd, errors }: Props) {
    return (
        <div className="lg:col-span-7 flex flex-col gap-y-5 bg-(--agenrap-gray-800) border border-white/5 rounded-2xl p-5 h-fit lg:h-full">
            <div className="flex flex-col gap-y-1 shrink-0">
                <span className="text-xs font-semibold text-(--agenrap-yellow-200) uppercase tracking-widest">
                    Horário recorrente bloqueado
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Esse intervalo será bloqueado todos os dias dentro do expediente — ideal para horário de almoço ou intervalo fixo.
                </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col sm:flex-row gap-4">
                {(["start", "end"] as const).map((field) => {
                    const value = field === "start" ? timeStart : timeEnd
                    const error = field === "start" ? errors?.start : errors?.end
                    return (
                        <div key={field} className="flex flex-col gap-y-1.5 flex-1">
                            <label className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-x-1.5">
                                <Clock size={10} className="text-(--agenrap-yellow-200)" />
                                {field === "start" ? "Início" : "Fim"}
                            </label>
                            <input
                                type="time"
                                value={value}
                                onChange={(e) => field === "start" ? setTimeStart(e.target.value) : setTimeEnd(e.target.value)}
                                className={`w-full bg-black/40 border text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all
                                    focus:ring-1 focus:ring-(--agenrap-purple-500)
                                    ${error
                                        ? "border-red-500/60 focus:border-red-500"
                                        : "border-white/10 focus:border-(--agenrap-purple-500)"
                                    }`}
                            />
                            {error && (
                                <p className="text-xs text-red-400 font-tree mt-0.5">{error}</p>
                            )}
                        </div>
                    )
                })}
            </div>

            {timeStart && timeEnd && timeEnd > timeStart && (
                <div className="flex items-center gap-x-2 bg-(--agenrap-purple-500)/10 border border-(--agenrap-purple-500)/20 rounded-xl px-4 py-3 mt-1">
                    <Clock size={13} className="text-(--agenrap-purple-500) shrink-0" />
                    <p className="text-xs text-(--agenrap-purple-500)/80 font-tree">
                        Bloqueio de <span className="font-semibold text-(--agenrap-purple-500)">{timeStart}h</span> às <span className="font-semibold text-(--agenrap-purple-500)">{timeEnd}h</span> todos os dias
                    </p>
                </div>
            )}
        </div>
    )
}