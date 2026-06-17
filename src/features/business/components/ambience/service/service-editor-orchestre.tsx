'use client'
import AddServicesForm from "@/src/features/business/components/ambience/service/add-services-form";
import ShowcaseDashServices from "@/src/features/business/components/ambience/service/showcase-dash-services";
import SubHeader from "@/src/shared/components/agenrap-ui/header/sub-header"
import { useSectionParams } from "@/src/shared/hooks/use-section-params";
import { useState } from "react";
export type ServiceEditorOrchestreProps = {
    tgrap: string
    initialMode: "new" | "list"
}
type ViewMode = "new" | "list"

  export default function ServiceEditorOrchestre({initialMode,tgrap}:ServiceEditorOrchestreProps){
    const {setParam} =useSectionParams("/dashboard/service");
        const [viewMode, setViewModeState] = useState<ViewMode>(initialMode);
  const modes = [
    { key: "new", label:"Adicionar" },
    { key: "list", label: "Ver Todos" },
    // futuramente: { key: "calendar", label: "Calendário" }
]
const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
    setParam("mode", mode)
}


return(
     <main className="flex flex-col w-full h-full  gap-y-8 overflow-hidden">
<SubHeader title="Serviços"     viewMode={viewMode}
    modes={modes}
    onModeChange={(key) => setViewMode(key as ViewMode)}/>
    {viewMode=="list"?    <ShowcaseDashServices />:       <AddServicesForm tgrap={tgrap} onSuccess={() => setViewMode("list")} />}

      
          </main>
)
  }
  
