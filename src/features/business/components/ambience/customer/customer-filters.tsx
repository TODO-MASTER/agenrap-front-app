"use client"

import { GitMerge, Users } from "lucide-react"
import { AgenrapFilters, FilterItem } from "@/src/shared/components/agenrap-ui/agenrap-filters/agenrap-filters"
import { TablePaginationProps } from "@/src/features/business/components/ambience/appointments/appointment-filters"

type CustomerFilterType = "all" | "merged"

const customerFilters: FilterItem<CustomerFilterType>[] = [
    { key: "all",    label: "Todos",                icon: <Users size={14} /> },
    { key: "merged", label: "Mesclagens pendentes", icon: <GitMerge size={14} /> },
]
 
export function CustomerFilters(props: TablePaginationProps) {
    return (
        <AgenrapFilters
            filters={customerFilters}
            defaultFilter="all"
            {...props}
        />
    )
}