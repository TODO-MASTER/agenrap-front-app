"use client"

import { useEffect, useState } from "react"
import { Calendar } from "../../ui/calendar"
import { ptBR } from "date-fns/locale"

export default function AgenrapCalendar() {
    const [dates, setDates] = useState<Date[]>([])
    useEffect(()=>{
        console.log(dates)
    },[dates])
    return (
        <Calendar mode="multiple" required selected={dates} onSelect={setDates} locale={ptBR}/>
    )
}

