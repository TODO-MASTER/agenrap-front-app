'use server'


import { CustomerJoinScheduleRes } from "@/src/features/customers/types/appointment.types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
export async function JoinScheduleByRapName(atSign:string){
      const res = await serverFetch<CustomerJoinScheduleRes>(`business/join-in-schedule?atSign=${normalizePublicHandle(atSign)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      return res;
}
export async function leaveBusinessAction(atSign: string){
    await serverFetch<ApiResponse<boolean>>(`business/leave?atSign=${normalizePublicHandle(atSign)}`, {
         headers: { 'Content-Type': 'application/json' },
        method: "DELETE",
    })
}


 