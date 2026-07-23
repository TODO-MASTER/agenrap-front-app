import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function TableSkeleton({ rows = 7 }: { rows?: number }) {
    return (
        <div className="flex flex-col mx-auto mt-8 lg:w-[90%] w-[95%]">
            <Skeleton className="h-8 w-48 mb-6 bg-(--agenrap-gray-800)/15" />
            <div className="border rounded-md overflow-hidden">
                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} className="h-16 border-b rounded-none bg-(--agenrap-gray-800)/15" />
                ))}
            </div>
        </div>
    )
}