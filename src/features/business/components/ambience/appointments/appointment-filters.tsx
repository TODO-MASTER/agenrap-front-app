"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { CalendarDays, CheckCircle2 } from "lucide-react"
import { AgenrapPagination } from "@/src/shared/components/agenrap-ui/pagination/agenrap-pagination"

interface Props {
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

type FilterType = "all" | "today" | "completed"

export function AppointmentFilters({page,totalPages,hasNext,hasPrev}:Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const active = (searchParams.get("filter") ?? "all") as FilterType

    function setFilter(filter: FilterType) {
        const params = new URLSearchParams(searchParams.toString())
        if (filter === "all") {
            params.delete("filter")
        } else {
            params.set("filter", filter)
        }
        params.delete("page")
        router.push(`${pathname}?${params.toString()}`)
    }

    const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
        {
            key: "all",
            label: "Todos",
            icon: null,
        },
        {
            key: "today",
            label: "Hoje",
            icon: <CalendarDays size={14} />,
        },
        {
            key: "completed",
            label: "Completos",
            icon: <CheckCircle2 size={14} />,
        },
    ]

    return (
        <div className="flex items-center justify-between  w-full  flex-wrap">
        <div className="flex items-center gap-2  flex-wrap">
            {filters.map(({ key, label, icon }) => (
                <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-full font-tree text-sm font-medium transition-colors
                        ${active === key
                            ? "bg-(--agenrap-gray-800) text-(--agenrap-yellow-200)"
                            : "bg-(--agenrap-gray-800)/10 text-(--agenrap-gray-800)/60 hover:bg-(--agenrap-gray-800)/20"
                        }`}
                >
                    {icon}
                    <span >{label}</span>
                </button>
            ))}
                      
        </div>
        <div className="hidden md:flex">
          {totalPages > 1 && (
                <AgenrapPagination
                    page={page}
                    totalPages={totalPages}
                    hasNext={hasNext}
                    hasPrev={hasPrev}
                />
            )}
            </div>
        </div>
    )
}