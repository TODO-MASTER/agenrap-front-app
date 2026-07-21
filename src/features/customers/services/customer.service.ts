'use server'


import { serverAction } from "@/src/shared/lib/server-fetch.lib";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
export async function JoinScheduleByRapName(atSign:string){
      const res = await serverAction<{
  id: number
  name: string
  atSign:string
}>(`business/join-in-schedule?atSign=${normalizePublicHandle(atSign)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      return res;
}
export async function leaveBusinessAction(atSign: string){
    await serverAction<boolean>(`business/leave?atSign=${normalizePublicHandle(atSign)}`, {
         headers: { 'Content-Type': 'application/json' },
        method: "DELETE",
    })
}


 