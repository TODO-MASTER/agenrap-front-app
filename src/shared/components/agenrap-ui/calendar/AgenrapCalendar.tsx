"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Calendar } from "../../ui/calendar"
import { ptBR } from "date-fns/locale"
import { dateUtils } from "@/src/shared/utils/dateUtils"
import { cn } from "@/src/shared/lib/utils"
import { getDefaultClassNames, PropsBase } from "react-day-picker"

export interface CalendarContext{
    date: Date | undefined,
    setDate: Dispatch<SetStateAction<Date | undefined>>,
    className:string
}

export default function AgenrapCalendar({date,setDate,className}:CalendarContext) {
   

    useEffect(() => {
        if (date) {
            console.log(dateUtils.toDateString(date!))
            console.log(dateUtils.getWeekDay(date!))
        }
    }, [date])

    return (
        <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR}
            className={`w-full mx-auto rounded-md border font-tree border-[#FFE082]/50 bg-transparent text-white ${className}`}

            classNames={{
                weekday:cn("text-white/40 w-full mb-2",...getDefaultClassNames().weekday),
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



