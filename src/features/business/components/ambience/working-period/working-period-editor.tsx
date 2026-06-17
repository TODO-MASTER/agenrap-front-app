'use client'
import AddServicesForm from "@/src/features/business/components/ambience/service/add-services-form";
import ShowcaseDashServices from "@/src/features/business/components/ambience/service/showcase-dash-services";
import AddWorkingPeriodForm from "@/src/features/business/components/ambience/working-period/add-working-period-form";
import ShowWorkingPeriods from "@/src/features/business/components/ambience/working-period/show-working-periods";
import SubHeader from "@/src/shared/components/agenrap-ui/header/sub-header"
import { useSectionParams } from "@/src/shared/hooks/use-section-params";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
export type WkpEditorOrchestreProps = {
    tgrap: string
    initialMode: "new" | "list"
}
type ViewMode = "new" | "list"

  export default function WorkingPeriodEditorOrchestre({initialMode,tgrap}:WkpEditorOrchestreProps){
        const weeks = useBusinessStore(bsCtx => bsCtx.weeks)
    const {setParam} =useSectionParams("/dashboard/journey");
    const router = useRouter()
        const [viewMode, setViewModeState] = useState<ViewMode>(initialMode);
  const modes = [
    { key: "new", label:"Adicionar" },
    { key: "list", label: "Ver Todos" },
]
const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
    setParam("mode", mode)
     router.refresh()
}


    return (
        <main className="flex flex-col w-full h-full gap-y-8 overflow-hidden">
            <SubHeader title="Jornada" viewMode={viewMode} modes={modes} onModeChange={(key) => setViewMode(key as ViewMode)} />
            {viewMode === "list"
                ? <ShowWorkingPeriods tgrap={tgrap} />
                : weeks.length > 0
                    ? <AddWorkingPeriodForm weeks={weeks} tgrap={tgrap}     onSuccess={() => {
        router.refresh()     
        setViewMode("list")  
    }}  />
                    : null
            }
        </main>
    )
  }
  
