"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DateRange } from "react-day-picker"
import {
    SaveDayOff,
    SaveTimeBlock,
    GetDayOffs,
    GetTimeBlocks,
    DeleteDayOff,
    DeleteTimeBlock,
} from "@/src/features/business/services/range-turn.service"
import { dateUtils } from "@/src/shared/utils/date.utils"
import { toast } from "sonner"
import { isRedirectError } from "next/dist/client/components/redirect-error"


import RangeTurnList from "./range-turn-list/range-turn-list"
import RangeTurnDetailsPanel from "@/src/features/business/components/ambience/range-turn/range-turn-details-panel"
import RangeTurnTimeEditor from "@/src/features/business/components/ambience/range-turn/range-turn-time-editor"
import RangeTurnDayEditor from "@/src/features/business/components/ambience/range-turn/range-turn-day-editor"
import RangeTurnKindToggle from "@/src/features/business/components/ambience/range-turn/range-turn-kind-toggle"
import RangeTurnHeader from "@/src/features/business/components/ambience/range-turn/range-turn-header"
import { HeaderSegmentInjector } from "@/src/shared/components/agenrap-ui/header/header-segment-injector"

import SubHeader from "@/src/shared/components/agenrap-ui/header/sub-header"
import { timeBlockSchema } from "@/src/features/business/schemas"
import { handleActionError } from "@/src/shared/lib/handle-action-error"

export type RangeTurnManagerProps = {
    tgrap: string
    initialKind: "day" | "time"
    initialMode: "new" | "list"
}
type BlockKind = "day" | "time"
type ViewMode = "new" | "list"
type DayOffListItem = { id: number; start: string; end: string; reason: string }
type TimeBlockListItem = { id: number; start: string; end: string; reason: string }

export default function RangeTurnManager({ tgrap, initialKind, initialMode }: RangeTurnManagerProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [viewMode, setViewModeState] = useState<ViewMode>(initialMode)
    const [blockKind, setBlockKindState] = useState<BlockKind>(initialKind)
    const [selectionMode, setSelectionMode] = useState<"single" | "range">("range")

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined })
    const [reason, setReason] = useState("")
    const [timeStart, setTimeStart] = useState("12:00")
    const [timeEnd, setTimeEnd] = useState("13:00")
    const [loading, setLoading] = useState(false)

    const [daysOffList, setDaysOffList] = useState<DayOffListItem[]>([])
    const [timeBlocksList, setTimeBlocksList] = useState<TimeBlockListItem[]>([])
const [timeErrors, setTimeErrors] = useState<{ start?: string; end?: string }>({})


    const updateQuery = (next: { kind?: BlockKind; mode?: ViewMode }) => {
        const params = new URLSearchParams(searchParams.toString())
        if (next.kind) params.set("kind", next.kind)
        if (next.mode) params.set("mode", next.mode)
        router.replace(`/dashboard/blocks?${params.toString()}`, { scroll: false })
    }

    const setViewMode = (mode: ViewMode) => {
        setViewModeState(mode)
        updateQuery({ mode })
    }

    const setBlockKind = (kind: BlockKind) => {
        setBlockKindState(kind)
            setTimeErrors({})
        updateQuery({ kind })
    }

    useEffect(() => {
        async function fetchInitialBlocks() {
            try {
                const [daysRes, timesRes] = await Promise.all([GetDayOffs(tgrap), GetTimeBlocks(tgrap)])
                if (daysRes?.data) setDaysOffList(daysRes.data as unknown as DayOffListItem[])
                if (timesRes?.data) setTimeBlocksList(timesRes.data as unknown as TimeBlockListItem[])
            } catch {
                toast.error("Erro ao carregar bloqueios.")
            }
        }
        fetchInitialBlocks()
    }, [tgrap,blockKind])

    const handleDeleteDayOff = async (id: number) => {
        try {
           const response = await DeleteDayOff(tgrap, id)
            setDaysOffList((prev) => prev.filter((i) => i.id !== id))
            toast.success(response.message??"Folga removida com sucesso!")
        } catch(e) {
                  handleActionError(e, router, tgrap, 'Erro ao tentar remover folga.')
        }
    }

    const handleDeleteTimeBlock = async (id: number) => {
        try {
            await DeleteTimeBlock(tgrap, id)
            setTimeBlocksList((prev) => prev.filter((i) => i.id !== id))
            toast.success("Bloqueio de horário removido!")
        } catch(e) {
            handleActionError(e, router, tgrap, 'Erro ao tentar remover folga.')
        }
    }

    const handleConfirmBlock = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (blockKind === "day") {
                let startString = ""
                let endString = ""

                if (selectionMode === "single" && date) {
                    startString = dateUtils.toDateString(date)
                    endString = startString
                } else if (selectionMode === "range" && range?.from) {
                    startString = dateUtils.toDateString(range.from)
                    endString = dateUtils.toDateString(range.to ?? range.from)
                }

                if (!startString || !endString) {
                    toast.error("Por favor, selecione os dias no calendário.")
                    return
                }

                const finalReason = reason || "Bloqueio de Agenda"
                const response = await SaveDayOff(tgrap, { start: startString, end: endString, reason: finalReason })
if (response.data==null) {
    toast.error(response.message)
    return
}
                toast.success(response.message)
                setDaysOffList((prev) => [...prev, { id: response.data!.id, start: startString, end: endString, reason: finalReason }])
                setReason("")
                setRange({ from: new Date(), to: undefined })
                setDate(new Date())
            } else {
            const parsed = timeBlockSchema.safeParse({ start: timeStart, end: timeEnd, reason })
            if (!parsed.success) {
                const fieldErrors = parsed.error.flatten().fieldErrors
                setTimeErrors({
                    start: fieldErrors.start?.[0],
                    end: fieldErrors.end?.[0],
                })
                return
            }
            setTimeErrors({})

                const finalReason = reason || "Bloqueio de horário"
                const response = await SaveTimeBlock(tgrap, { start: timeStart, end: timeEnd, reason: finalReason })
if (response.data==null) {
    toast.error(response.message)
    return
}
                toast.success(response.message)
                setTimeBlocksList((prev) => [...prev, { id: response.data!.id, start: timeStart, end: timeEnd, reason: finalReason }])
                setReason("")
            }
        } catch (e) {
            handleActionError(e, router, tgrap, 'Erro ao tentar remover folga.')
        } finally {
            setLoading(false)
        }
    }

    const selectedStart =
        blockKind === "day"
            ? selectionMode === "range" ? range?.from?.toLocaleDateString("pt-BR") : date?.toLocaleDateString("pt-BR")
            : timeStart

    const selectedEnd =
        blockKind === "day"
            ? selectionMode === "range" ? (range?.to ?? range?.from)?.toLocaleDateString("pt-BR") : date?.toLocaleDateString("pt-BR")
            : timeEnd

    const activeCount = blockKind === "day" ? daysOffList.length : timeBlocksList.length
    const baseQuery = `rap=${tgrap}&kind=${blockKind}`

    const modes = [
    { key: "new", label: blockKind === "day" ? "Bloquear Dias" : "Bloquear Horários" },
    { key: "list", label: blockKind === "day" ? `Folgas (${activeCount})` : `Horários (${activeCount})` },
]

    return (
        <main className="flex flex-col w-full h-full  overflow-hidden">

<SubHeader title="Bloqueio de Turnos"     viewMode={viewMode}
    modes={modes}
    onModeChange={(key) => setViewMode(key as ViewMode)}/>

            <RangeTurnKindToggle blockKind={blockKind} onChange={setBlockKind} />

            {viewMode === "new" ? (
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full flex-1 min-h-0 py-4 lg:overflow-hidden ">
                    {blockKind === "day" ? (
                        <RangeTurnDayEditor
                            selectionMode={selectionMode}
                            onSelectionModeChange={setSelectionMode}
                            date={date}
                            setDate={setDate}
                            range={range}
                            setRange={setRange}
                        />
                    ) : (
               <RangeTurnTimeEditor
    timeStart={timeStart}
    timeEnd={timeEnd}
    setTimeStart={setTimeStart}
    setTimeEnd={setTimeEnd}
    errors={timeErrors}
/>
                    )}

                    <RangeTurnDetailsPanel
                        blockKind={blockKind}
                        reason={reason}
                        setReason={setReason}
                        selectedStart={selectedStart}
                        selectedEnd={selectedEnd}
                        loading={loading}
                        onConfirm={handleConfirmBlock}
                            timeError={timeErrors.end}
                    />
                </section>
            ) : (
                <RangeTurnList
                    blockKind={blockKind}
                    activeCount={activeCount}
                    daysOffList={daysOffList}
                    timeBlocksList={timeBlocksList}
                    onDeleteDayOff={handleDeleteDayOff}
                    onDeleteTimeBlock={handleDeleteTimeBlock}
                />
            )}
        </main>
    )
}