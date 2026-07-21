'use server'


import { SlotItem, SlotRes } from "@/src/shared/types/slots.types";
import { serverAction, serverFetch } from "../lib/server-fetch.lib";

export type WeekStringType = "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB" | "DOM";
      


export async function GenerateSlots(serviceId:number,date:string,week:WeekStringType){
          const res = await serverAction<{slots:SlotItem[] , bookedSlots?: string[]}>(`appointment/slots/generate?serviceId=${serviceId}&date=${date}&week=${week}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}


