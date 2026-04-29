import { create } from "zustand";
import { IServicesRes } from "../interfaces/responses/IServiceRes";
import { IBusinessCtx } from "../types/Business/IBusinessCtx";

interface BusinessState{
    business:IBusinessCtx|null,
    selectedService:IServicesRes|null
    setBusiness:(business:IBusinessCtx)=>void
    setSelectedService:(service:IServicesRes)=>void
    clearSelectedService:()=>void
}

export const useBusinessStore = create<BusinessState>((set)=>({
    business:null,
    selectedService:null,
    setBusiness:(business)=>set({business}),
    setSelectedService:(service)=>set({selectedService:service}),
    clearSelectedService:()=>set({selectedService:null})

}))

