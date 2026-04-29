'use server'

import { IAppointmentReq } from "../../interfaces/requests/IAppointmentReq";
import { IAppointmentRes, IBookedDaysRes } from "../../interfaces/responses/IAppointmentRes";
import { serverFetch } from "../../lib/serverFetch";

export async function saveAppointment(values:IAppointmentReq,serviceId:string){
          const res = await serverFetch<IAppointmentRes>(`appointment/save?serviceId=${serviceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(values)
      });
      return res
}
export async function GetFullDays(serviceId:number,month:number,year:number){
          const res = await serverFetch<IBookedDaysRes>(`appointment/full-days?serviceId=${serviceId}&month=${month}&year=${year}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return res
}
