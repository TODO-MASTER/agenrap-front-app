"use client"
 
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AgenrapPagination } from "@/src/shared/components/agenrap-ui/pagination/agenrap-pagination"
 
export type FilterItem<T extends string> = {
    key: T
    label: string
    icon?: React.ReactNode
}
 
interface Props<T extends string> {
    filters: FilterItem<T>[]
    defaultFilter: T
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}
 
export function AgenrapFilters<T extends string>({
    filters,
    defaultFilter,
    page,
    totalPages,
    hasNext,
    hasPrev,
}: Props<T>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const active = (searchParams.get("filter") ?? defaultFilter) as T
 
    function setFilter(filter: T) {
        const params = new URLSearchParams(searchParams.toString())
        if (filter === defaultFilter) {
            params.delete("filter")
        } else {
            params.set("filter", filter)
        }
        params.delete("page")
        router.push(`${pathname}?${params.toString()}`)
    }
 
    return (
        <div className="flex items-center justify-between w-full flex-wrap gap-y-2">
            <div className="flex items-center gap-2 flex-wrap">
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
                        <span>{label}</span>
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
 