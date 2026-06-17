"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import { Calendar } from "../../ui/calendar"
import { ptBR } from "date-fns/locale"
import { dateUtils } from "@/src/shared/utils/date.utils"
import { cn } from "@/src/shared/lib/utils"
import { getDefaultClassNames, DateRange } from "react-day-picker"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import { BusinessCtx } from "@/src/shared/types"

export type AgenrapCalendarProps = {
    business: BusinessCtx
    className?: string
    fullDays?: string[]
    setFullDays?: Dispatch<SetStateAction<string[]>>
    isOwner?: boolean
    selectionMode?: "single" | "range"
    date?: Date
    setDate?: Dispatch<SetStateAction<Date | undefined>>
    range?: DateRange
    setRange?: Dispatch<SetStateAction<DateRange | undefined>>
}

export default function AgenrapCalendar({
    business,
    className,
    fullDays = [],
    setFullDays,
    isOwner,
    selectionMode = "single",
    date,
    setDate,
    range,
    setRange,
}: AgenrapCalendarProps) {
    const { handleMonthChange } = useCustomerActions()
    useEffect(()=>{

        console.log(range)
    },[range])

    return (
        <Calendar
            locale={ptBR}
            className={cn(
                "w-full rounded-md border font-tree border-[#FFE082]/50 bg-(--agenrap-gray-800) text-white",
                className
            )}
            onMonthChange={setFullDays
                ? (month) => handleMonthChange(month, setFullDays)
                : undefined
            }
            mode={selectionMode as any}
            {...(selectionMode === "range"
                ? { selected: range, onSelect: setRange }
                : { selected: date, onSelect: setDate }
            )}
            disabled={(day) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                if (day < today) return true
                if (isOwner) return false
                const isWorkingDay = business?.weeks.some(wk =>
                    day.getDay() === dateUtils.getWeekNumber(wk.week)
                )
                if (!isWorkingDay) return true
                return fullDays.includes(dateUtils.toDateString(day))
            }}
            classNames={{
                weekday: cn("text-white/80 w-full mb-2", getDefaultClassNames().weekday),
                // day_button recebe os data attrs do CalendarDayButton — sobrescreve aqui
                day_button: cn(
                    "rounded-none transition-colors outline-none",
                    "hover:bg-[#BB77EE] hover:text-white",
                    // single select
                    "data-[selected-single=true]:bg-[#BB77EE] data-[selected-single=true]:text-white",
                    // range start/end: roxo, sem arredondamento
                    "data-[range-start=true]:bg-[#BB77EE] data-[range-start=true]:text-white data-[range-start=true]:rounded-none",
                    "data-[range-end=true]:bg-[#BB77EE] data-[range-end=true]:text-white data-[range-end=true]:rounded-none",
                    // range middle: creme
                    "data-[range-middle=true]:bg-[#F5E6CC] data-[range-middle=true]:text-[#2e2e2e] data-[range-middle=true]:rounded-none",
                ),
                selected: cn(
                    "transition-colors duration-100 outline-none",
                    "[&>button]:bg-[#BB77EE] [&>button]:text-white [&>button]:rounded-none",
                ),
                range_start: "rounded-none",
                range_middle: "rounded-none",
                range_end: "rounded-none",
                today: "text-white bg-(--agenrap-brown-500)/20 rounded-none",
            }}
        />
    )
}