'use server'

import { AppointmentReq, AppointmentRes, BookedDaysRes } from "@/src/shared/types/appointment.types";
import { serverFetch } from "../lib/server-fetch.lib";

export async function saveAppointment(values:AppointmentReq,serviceId:string,customerId:number|null){
          const res = await serverFetch<AppointmentRes>(`appointment/save${customerId!=null?`/customer/${customerId}`:""}?serviceId=${serviceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(values)
      });
      return res
}
export async function GetFullDays(serviceId:number,month:number,year:number){
          const res = await serverFetch<BookedDaysRes>(`appointment/full-days?serviceId=${serviceId}&month=${month}&year=${year}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}
