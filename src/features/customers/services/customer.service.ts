'use server'


import { CustomerJoinScheduleRes } from "@/src/features/customers/types/appointment.types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";
export async function JoinScheduleByRapName(businessName:string){
      const res = await serverFetch<CustomerJoinScheduleRes>(`business/join-in-schedule?businessName=${businessName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      return res;
}

export async function UpdatePhoneAction(telephone: string) {
    return await serverFetch<ApiResponse<boolean>>('user/update-phone', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telephone }),
    })
}

export async function ChangePasswordAction(currentPassword: string, newPassword: string) {
    return await serverFetch<void>('user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
    })
}
 