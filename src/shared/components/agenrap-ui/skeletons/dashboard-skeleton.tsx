import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-y-3 w-full">
            {/* Subscription banner */}
            <Skeleton className="h-24 w-full rounded-xl bg-(--agenrap-gray-800)/15" />

            {/* Header (saudação, nome do negócio, mês) */}
            <div className="flex flex-col gap-y-2 border-b pb-3" style={{ borderColor: "#D9D0C8" }}>
                <Skeleton className="h-3 w-24 bg-(--agenrap-gray-800)/15" />
                <Skeleton className="h-7 w-64 bg-(--agenrap-gray-800)/15" />
                <Skeleton className="h-3 w-40 bg-(--agenrap-gray-800)/15" />
            </div>

            {/* Próximo atendimento */}
            <Skeleton className="h-14 w-full rounded-md bg-(--agenrap-gray-800)/15" />

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 rounded-md w-full bg-(--agenrap-gray-800)/15" />
                ))}
            </div>

            {/* Receita diária + Status agendamentos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <Skeleton className="h-72 rounded-md w-full lg:col-span-2 bg-(--agenrap-gray-800)/15" />
                <Skeleton className="h-72 rounded-md w-full bg-(--agenrap-gray-800)/15" />
            </div>

            {/* Top serviços + Taxas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <Skeleton className="h-72 rounded-md w-full lg:col-span-2 bg-(--agenrap-gray-800)/15" />
                <Skeleton className="h-72 rounded-md w-full bg-(--agenrap-gray-800)/15" />
            </div>
        </div>
    )
}