"use client"

import ListRow from "@/src/features/business/components/ambience/range-turn/range-turn-list/list-row"
import { ScrollArea, ScrollBar } from "@/src/shared/components/ui/scroll-area"
import { CalendarDays, Clock } from "lucide-react"

type BlockKind = "day" | "time"
type DayOffListItem = { id: number; start: string; end: string; reason: string }
type TimeBlockListItem = { id: number; start: string; end: string; reason: string }

type Props = {
    blockKind: BlockKind
    activeCount: number
    daysOffList: DayOffListItem[]
    timeBlocksList: TimeBlockListItem[]
    onDeleteDayOff: (id: number) => void
    onDeleteTimeBlock: (id: number) => void
}

export default function RangeTurnList({
    blockKind, activeCount, daysOffList, timeBlocksList, onDeleteDayOff, onDeleteTimeBlock,
}: Props) {
    const isEmpty = blockKind === "day" ? daysOffList.length === 0 : timeBlocksList.length === 0
    const Icon = blockKind === "day" ? CalendarDays : Clock

    return (
        <section className="w-full flex-1 min-h-0 bg-(--agenrap-gray-800) border border-white/5 rounded-2xl overflow-hidden mt-4 flex flex-col">
            <div className="flex items-center gap-x-3 px-5 py-4 border-b border-white/5 shrink-0">
                <div className="p-1.5 rounded-lg bg-(--agenrap-yellow-200)/10 border border-(--agenrap-yellow-200)/15">
                    <Icon size={14} className="text-(--agenrap-yellow-200)" />
                </div>
                <p className="font-tree text-white font-semibold text-base flex-1">
                    {blockKind === "day" ? "Folgas Ativas" : "Horários Fixos Bloqueados"}
                </p>
                <span className="bg-(--agenrap-yellow-200) text-black text-xs font-bold rounded-full px-2.5 py-0.5 font-tree">
                    {activeCount}
                </span>
            </div>

            <ScrollArea className="flex-1 w-full px-5 py-4">
                <ScrollBar className="[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-purple-500)" />
                <div className="flex flex-col gap-y-2">
                    {isEmpty ? (
                        <div className="flex flex-col items-center justify-center py-14 gap-y-2">
                            <Icon size={28} className="text-zinc-700" />
                            <p className="text-sm text-zinc-600 font-tree text-center">
                                {blockKind === "day"
                                    ? "Nenhuma folga cadastrada ainda."
                                    : "Nenhum horário fixo bloqueado ainda."}
                            </p>
                        </div>
                    ) : blockKind === "day" ? (
                        daysOffList.map((item) => (
                            <ListRow
                                key={item.id}
                                reason={item.reason}
                                label={`Período: ${item.start} até ${item.end}`}
                                onDelete={() => onDeleteDayOff(item.id)}
                            />
                        ))
                    ) : (
                        timeBlocksList.map((item) => (
                            <ListRow
                                key={item.id}
                                reason={item.reason}
                                label={`Horário: ${item.start}h às ${item.end}h`}
                                onDelete={() => onDeleteTimeBlock(item.id)}
                            />
                        ))
                    )}
                </div>
            </ScrollArea>
        </section>
    )
}