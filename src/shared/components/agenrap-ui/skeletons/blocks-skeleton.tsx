import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function BlocksSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="flex flex-col mx-auto mt-8 lg:w-[90%] w-[95%]">
            <Skeleton className="h-8 w-40 mb-6 bg-(--agenrap-gray-800)/15" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <Skeleton key={i} className="h-115 rounded-xl w-full bg-(--agenrap-gray-800)/15" />
                ))}
            </div>
        </div>
    )
}