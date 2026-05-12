import { Service, WorkingPeriod } from "@/src/features/business/types"
import { BusinessCtx } from "@/src/shared/types"
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils"
import { create } from "zustand"


interface BusinessState{
    business:BusinessCtx|null,
    selectedService:Service|null
    selectedWorkingPeriod:WorkingPeriod|null
    weeks:NormalizedWeek[]
    setBusiness:(business:BusinessCtx)=>void
    setSelectedService:(service:Service)=>void
    setSelectedWorkingPeriod:(wkp:WorkingPeriod)=>void
    setWeeks: (weeks: NormalizedWeek[]) => void
    clearSelectedService:()=>void
    
}

export const useBusinessStore = create<BusinessState>((set)=>({
    business:null,
    selectedService:null,
    selectedWorkingPeriod:null,
    weeks:[],
    setBusiness:(business)=>set({business}),
    setSelectedService:(service)=>set({selectedService:service}),
    setSelectedWorkingPeriod:(wkp)=>set({selectedWorkingPeriod:wkp}),
    setWeeks: (weeks) => set({weeks:weeks}),
    clearSelectedService:()=>set({selectedService:null}),

}))

