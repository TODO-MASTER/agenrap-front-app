'use server'

import { AppointmentCancelRes, AppointmentReq, AppointmentRes, BookedDaysRes } from "@/src/shared/types/appointment.types";
import { serverFetch } from "../lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";
import { boolean } from "zod";

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
export async function GetNextAppointments(businessId:number,customerId:number|null=null){
          const res = await serverFetch<AppointmentCancelRes>(`appointment/next-view?businessId=${businessId}${customerId!=null?`&customerId=${customerId}`:""}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}
export async function handleCancelAppointment(businessId:number,appointmentId:number,customerId:number|null=null){
  const res = await serverFetch<ApiResponse<boolean>>(`appointment/cancel/${businessId}?appointmentId=${appointmentId}${customerId!=null?`&customerId=${customerId}`:""}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
}
