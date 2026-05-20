'use server'


import { CustomerJoinScheduleRes } from "@/src/features/customers/types/appointment.types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
export async function JoinScheduleByRapName(businessName:string){
      const res = await serverFetch<CustomerJoinScheduleRes>(`business/join-in-schedule?businessName=${businessName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      return res;
}