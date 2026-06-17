"use client"

import { CalendarDays, Clock } from "lucide-react"

type BlockKind = "day" | "time"
type Props = { blockKind: BlockKind; onChange: (kind: BlockKind) => void }

export default function RangeTurnKindToggle({ blockKind, onChange }: Props) {
    return (
        <div className="flex items-center gap-x-2  mb-1 shrink-0 w-full sm:w-fit">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40 hidden sm:block">
                Tipo
            </span>
            <div className="flex bg-black/5 border border-black/8 rounded-lg p-0.5 gap-x-0.5 w-full sm:w-fit">
                {(["day", "time"] as BlockKind[]).map((kind) => (
                    <button
                        key={kind}
                        type="button"
                        onClick={() => onChange(kind)}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                            blockKind === kind
                                ? "bg-(--agenrap-brown-500) text-white font-semibold"
                                : "text-black/40 hover:text-black/70"
                        }`}
                    >
                        {kind === "day" ? <CalendarDays size={11} /> : <Clock size={11} />}
                        {kind === "day" ? "Folga (dias)" : "Horário fixo"}
                    </button>
                ))}
            </div>
        </div>
    )
}