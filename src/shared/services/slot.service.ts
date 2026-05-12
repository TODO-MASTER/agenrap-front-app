'use server'


import { SlotRes } from "@/src/shared/types/slots.types";
import { serverFetch } from "../lib/server-fetch.lib";

export type WeekStringType = "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB" | "DOM";
      


export async function GenerateSlots(serviceId:number,date:string,week:WeekStringType){
          const res = await serverFetch<SlotRes>(`appointment/slots/generate?serviceId=${serviceId}&date=${date}&week=${week}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}


