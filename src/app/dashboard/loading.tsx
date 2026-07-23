import { DashboardSkeleton } from "@/src/shared/components/agenrap-ui/skeletons/dashboard-skeleton";

export default function Loading() {
    return (
        <div className="mx-auto lg:w-[90%] w-[95%] mt-8">
            <DashboardSkeleton />
        </div>
    )
}



