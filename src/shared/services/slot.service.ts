'use server'


import { SlotItem, SlotRes } from "@/src/shared/types/slots.types";
import { serverAction, serverFetch } from "../lib/server-fetch.lib";

export type WeekStringType = "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB" | "DOM";
      


export async function GenerateSlots(serviceId:number,date:string,week:WeekStringType,professionalId?:number){
          const params = new URLSearchParams({ serviceId: serviceId.toString(), date, week })
          if (professionalId != null) params.append('professionalId', professionalId.toString())
          const res = await serverAction<{slots:SlotItem[] , bookedSlots?: string[]}>(`appointment/slots/generate?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}