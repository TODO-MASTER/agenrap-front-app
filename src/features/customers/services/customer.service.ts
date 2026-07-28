'use server'


import { BusinessSearchResult } from "@/src/features/customers/hooks/use-search-business";
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
export async function searchBusiness(query: string){
    const res =await serverAction<BusinessSearchResult[]>(`business/search?query=${query}`, {
         headers: { 'Content-Type': 'application/json' },
        method: "GET",
    })
    return res
}


 