"use client"

import { CalendarClock, CalendarDays } from "lucide-react"
import { DateRange } from "react-day-picker"
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/agenrap-calendar"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { Dispatch, SetStateAction } from "react"

type Props = {
    selectionMode: "single" | "range"
    onSelectionModeChange: (mode: "single" | "range") => void
    date: Date | undefined
    setDate: Dispatch<SetStateAction<Date | undefined>>
    range: DateRange | undefined
    setRange: Dispatch<SetStateAction<DateRange | undefined>>
}

export default function RangeTurnDayEditor({ selectionMode, onSelectionModeChange, date, setDate, range, setRange }: Props) {
    const business = useBusinessStore((bsn) => bsn.business)

    return (
        <div className="lg:col-span-7 flex flex-col gap-y-4 bg-(--agenrap-gray-800) border border-white/5 rounded-2xl p-5 h-fit lg:h-full lg:overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-(--agenrap-yellow-200) uppercase tracking-widest">
                    Período de bloqueio
                </span>
                <div className="flex bg-black/30 border border-white/6 rounded-lg p-0.5 gap-x-0.5 w-full sm:w-auto">
                    {(["range", "single"] as const).map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => onSelectionModeChange(mode)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                                selectionMode === mode
                                    ? "bg-(--agenrap-yellow-200) text-black font-semibold"
                                    : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {mode === "range" ? <CalendarDays size={12} /> : <CalendarClock size={12} />}
                            {mode === "range" ? "Modo Faixa" : "A Dedo"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex-1 w-full max-w-md mx-auto flex items-center justify-center min-h-0">
                <AgenrapCalendar
                    business={business!}
                    className="w-full border-none bg-transparent"
                    selectionMode={selectionMode}
                    date={date}
                    setDate={setDate}
                    range={range}
                    setRange={setRange}
                    fullDays={[]}
                    setFullDays={() => {}}
                    isOwner={true}
                />
            </div>
        </div>
    )
}