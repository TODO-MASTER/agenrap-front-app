'use server'

import { ICustomerJoinScheduleRes } from "@/src/shared/interfaces/responses/ICustomerJoinScheduleRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function JoinScheduleByRapName(businessName:string){
      const res = await serverFetch<ICustomerJoinScheduleRes>(`business/join-in-schedule?businessName=${businessName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      
    
      revalidatePath('/appointments');
      return res;
}