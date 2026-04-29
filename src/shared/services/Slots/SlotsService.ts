'use server'

import { ISlotRes } from "../../interfaces/responses/ISlotsRes";
import { serverFetch } from "../../lib/serverFetch";

export type WeekStringType = "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB" | "DOM";
      


export async function GenerateSlots(serviceId:number,date:string,week:WeekStringType){
          const res = await serverFetch<ISlotRes>(`appointment/slots/generate?serviceId=${serviceId}&date=${date}&week=${week}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}


