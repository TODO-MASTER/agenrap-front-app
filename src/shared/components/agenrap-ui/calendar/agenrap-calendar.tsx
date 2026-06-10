"use client"

import { Dispatch, SetStateAction } from "react"
import { Calendar } from "../../ui/calendar"
import { ptBR } from "date-fns/locale"
import { dateUtils } from "@/src/shared/utils/date.utils"
import { cn } from "@/src/shared/lib/utils"
import { getDefaultClassNames, DateRange } from "react-day-picker"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import { BusinessCtx } from "@/src/shared/types"

export type AgenrapCalendarProps = {
    business: BusinessCtx
    className: string
    fullDays: string[]
    setFullDays: Dispatch<SetStateAction<string[]>>
    isOwner?: boolean
    
    // Novas props para suportar o controle dinâmico
    selectionMode?: "single" | "range"
    
    // Estado para o modo Escolher a Dedo (Single)
    date?: Date | undefined
    setDate?: Dispatch<SetStateAction<Date | undefined>>
    
    // Estado para o modo Faixa (Range)
    range?: DateRange | undefined
    setRange?: Dispatch<SetStateAction<DateRange | undefined>>
}

export default function AgenrapCalendar({ 
    business, 
    className, 
    fullDays, 
    setFullDays,
    isOwner,
    selectionMode = 'single',
    date,
    setDate,
    range,
    setRange
}: AgenrapCalendarProps) {
    const { handleMonthChange } = useCustomerActions()

    return (
        <div className="w-full flex flex-col gap-2">
            {/* O segredo está em espalhar condicionalmente as propriedades com base no selectionMode */}
            <Calendar 
                locale={ptBR}
                className={`w-full rounded-md border font-tree border-[#FFE082]/50 bg-(--agenrap-gray-800) text-white ${className}`}
                onMonthChange={(month) => handleMonthChange(month, setFullDays)}
                
                // Configuração Dinâmica de Modo
                mode={selectionMode as any}
                {...(selectionMode === "single" 
                    ? { selected: date, onSelect: setDate } 
                    : { selected: range, onSelect: setRange }
                )}

                disabled={(day) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const isBeforeToday = day < today;
                    
                    // Se for folga do Owner, talvez você queira que ele consiga selecionar 
                    // dias que não são dias úteis normais para forçar bloqueios.
                    const isWorkingDay = business?.weeks.some(wk =>
                        day.getDay() === dateUtils.getWeekNumber(wk.week)
                    );
                    
                    const isFullDay = !isOwner && fullDays.includes(dateUtils.toDateString(day));

                    // Se for o dono gerenciando DayOff, tiramos a trava de "isWorkingDay"
                    if (isOwner) {
                        return isBeforeToday; 
                    }

                    return isBeforeToday || !isWorkingDay || isFullDay;
                }}
                classNames={{
                    weekday: cn("text-white/80 w-full mb-2", ...getDefaultClassNames().weekday),
                    day_button: cn(
                        "rounded-none transition-colors",
                        "hover:bg-(--agenrap-purple-500)",
                        "data-[selected=true]:bg-(--agenrap-purple-500)",
                        "data-[selected=true]:text-black",
                        "outline-none"
                    ),
                    selected: cn(
                        "transition-colors duration-100",
                        "data-[selected=true]:[&>button]:hover:bg-(--agenrap-purple-500)/50 data-[selected=true]:[&>button]:hover:text-black",
                        "data-[selected=true]:[&>button]:bg-(--agenrap-purple-500)",
                        "outline-none"
                    ),
                    // Garante que o meio da faixa (range) fique destacado visualmente se o shadcn/ui der suporte
                    range_middle: "bg-(--agenrap-purple-500)/30 text-white", 
                    today: "text-foreground rounded-none text-white bg-(--agenrap-brown-500)/20",
                }}
            />
        </div>
    )
}