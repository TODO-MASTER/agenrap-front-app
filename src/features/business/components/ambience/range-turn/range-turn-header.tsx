"use client"

import { CalendarClock } from "lucide-react"

type Mode = { key: string; label: string }

type Props = {
    viewMode: string
    modes: Mode[]
    onModeChange: (key: string) => void
}

export default function RangeTurnHeader({ viewMode, modes, onModeChange }: Props) {
    return (
        <div className="flex w-full flex-col sm:flex-row sm:items-end justify-between gap-y-0 gap-x-4 shrink-0">
            {/* Título — cor adapta ao contexto claro no desktop */}
            <div className="flex items-center gap-x-3 pb-2.5">
                <div className="p-2 rounded-xl bg-(--agenrap-purple-500)/15 border border-(--agenrap-purple-500)/25">
                    <CalendarClock className="text-(--agenrap-purple-500)" size={20} />
                </div>
                <h1 className="text-xl font-tree md:text-2xl font-semibold text-black sm:text-black">
                    Bloqueio de Turnos
                </h1>
            </div>

            {/* Tabs — ancoradas na border-b do container */}
            <div className="flex gap-x-0 border-b border-black/10 w-full sm:w-fit">
                {modes.map((m) => (
                    <button
                        key={m.key}
                        type="button"
                        onClick={() => onModeChange(m.key)}
                        className={`px-5 py-2.5 text-sm font-medium font-tree transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                            viewMode === m.key
                                ? "border-(--agenrap-purple-500) text-(--agenrap-purple-500)"
                                : "border-transparent text-zinc-400 hover:text-zinc-600 hover:border-black/20"
                        }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>
        </div>
    )
}