import { create } from "zustand";
import { IServicesRes } from "../interfaces/responses/IServiceRes";
import { IBusinessCtx, IWkCtx } from "../types/Business/IBusinessCtx";
import { IWkPeriodRes } from "../interfaces/responses/IWkRes";
import { INormalizedWeek } from "../utils/normalizeWeek";

interface BusinessState{
    business:IBusinessCtx|null,
    selectedService:IServicesRes|null
    selectedWorkingPeriod:IWkPeriodRes|null
    weeks:INormalizedWeek[]
    setBusiness:(business:IBusinessCtx)=>void
    setSelectedService:(service:IServicesRes)=>void
    setSelectedWorkingPeriod:(wkp:IWkPeriodRes)=>void
    setWeeks: (weeks: INormalizedWeek[]) => void
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

