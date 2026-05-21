"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import { Calendar } from "../../ui/calendar"
import { ptBR } from "date-fns/locale"
import { dateUtils } from "@/src/shared/utils/date.utils"
import { cn } from "@/src/shared/lib/utils"
import { getDefaultClassNames } from "react-day-picker"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import { BusinessCtx } from "@/src/shared/types"

export type AgenrapCalendarProps = {
    business: BusinessCtx,
    date: Date | undefined,
    setDate: Dispatch<SetStateAction<Date | undefined>>,
    fullDays: string[]
    setFullDays: Dispatch<SetStateAction<string[]>>
    className: string
    isOwner?: boolean
}
export default function AgenrapCalendar({ business, date, setDate, className, fullDays, setFullDays,isOwner  }: AgenrapCalendarProps) {
    const { handleMonthChange } = useCustomerActions()
    useEffect(() => {
        console.log(date)
    }, [date])


    return (
        <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR}
            className={`w-full  rounded-md border font-tree border-[#FFE082]/50 bg-(--agenrap-gray-800) text-white ${className}`}
            onMonthChange={(month) => handleMonthChange(month, setFullDays)}
            disabled={(day) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const isBeforeToday = day < today;
                const isWorkingDay = business?.weeks.some(wk =>
                    day.getDay() === dateUtils.getWeekNumber(wk.week)
                );
                 const isFullDay = !isOwner && fullDays.includes(dateUtils.toDateString(day));

                return isBeforeToday || !isWorkingDay || isFullDay;
            }}
            classNames={{
                weekday: cn("text-white/80 w-full mb-2", ...getDefaultClassNames().weekday),
                day_button: cn(
                    "   rounded-none transition-colors",
                    "hover:bg-(--agenrap-purple-500)",
                    "data-[selected=true]:bg-blue-600",
                    "data-[selected=true]:text-black",
                    "data-[selected=true]:bg-blue-700",

                    "outline-none"

                ),
                selected: cn(
                    "transition-colors duration-100 ",
                    "data-[selected=true]:[&>button]:hover:bg-(--agenrap-purple-500)/50 data-[selected=true]:[&>button]:hover:text-black",
                    "data-[selected=true]:[&>button]:bg-(--agenrap-purple-500)",
                    "",
                    "outline-none"

                ),
                today: "text-foreground rounded-non text-white   bg-(--agenrap-brown-500)/20",
            }}

        />
    )
}



