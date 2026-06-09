import { AgenrapFilters, FilterItem } from "@/src/shared/components/agenrap-ui/agenrap-filters/agenrap-filters"
import { CalendarDays, CheckCircle2 } from "lucide-react"

type AppointmentFilterType = "all" | "today" | "completed"

 
export type TablePaginationProps ={
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}
 
 
const appointmentFilters: FilterItem<AppointmentFilterType>[] = [
    { key: "all",       label: "Todos",     icon: null },
    { key: "today",     label: "Hoje",      icon: <CalendarDays size={14} /> },
    { key: "completed", label: "Completos", icon: <CheckCircle2 size={14} /> },
]
 
export function AppointmentFilters(props: TablePaginationProps) {
    return (
        <AgenrapFilters
            filters={appointmentFilters}
            defaultFilter="all"
            {...props}
        />
    )
}