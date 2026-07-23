import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function BusinessDisplaySkeleton() {
    return (
        <div className="grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col w-full">
                    <div className="flex flex-col w-full overflow-hidden rounded-md border border-(--agenrap-gray-800)/10">
                        <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
                            <div className="flex flex-col gap-y-2 min-w-0 flex-1">
                                <Skeleton className="h-6 w-3/4 bg-(--agenrap-gray-800)/15" />
                                <Skeleton className="h-3 w-1/3 bg-(--agenrap-gray-800)/10" />
                            </div>
                            <Skeleton className="h-5 w-16 rounded-full shrink-0 mt-1 bg-(--agenrap-gray-800)/15" />
                        </div>

                        <div className="flex flex-col justify-center px-6 py-6 rounded-tl-[3rem] border-t border-(--agenrap-gray-800)/10">
                            <Skeleton className="h-7 w-2/3 mb-2 bg-(--agenrap-gray-800)/15" />
                            <Skeleton className="h-3 w-1/2 bg-(--agenrap-gray-800)/10" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-full mt-2 rounded-md bg-(--agenrap-gray-800)/10" />
                </div>
            ))}
        </div>
    )
}