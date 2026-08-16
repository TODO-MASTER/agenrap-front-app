'use server'


import { CreateWorkingPeriodReq, DeleteWorkingPeriodRes, EditWorkingPeriodRes, WorkingPeriod } from "@/src/features/business/types";
import { serverAction, serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
import { revalidatePath } from "next/cache";

export type ProfessionalWkPeriodReq = {
    week: string
    initial: string
    end: string
}
export async function CreatWorkingPeriod(values:CreateWorkingPeriodReq,atSign:string){
    const res = await serverAction<{ alreadyInitial: boolean, weeks: WorkingPeriod[] }>(`working-period/create?atSign=${normalizePublicHandle(atSign)}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    
    return res

}

export async function GetWorkingPeriodPerRap(rap:string) {
  const res =  await serverFetch<WorkingPeriod[]>(`working-period/read-all?atSign=${normalizePublicHandle(rap)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}
export async function EditWorkingPeriodService(values:Omit<WorkingPeriod,'id'>,rap:string,wkpId:number) {
  const res = await serverAction<{ alreadyInitial: boolean, week: WorkingPeriod }>(`working-period/edit?atSign=${normalizePublicHandle(rap)}&wkpId=${wkpId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  return res;
}
export async function DeleteWkpService(rap:string,wkpId:number) {
  const res = await serverAction<{ alreadyInitial: boolean }>(`working-period/delete?atSign=${normalizePublicHandle(rap)}&wkpId=${wkpId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}


//CAIO<- PROFESSIONAL




export async function CreateProfessionalWorkingPeriod(professionalId: number, values: ProfessionalWkPeriodReq[]) {
    const res = await serverAction<WorkingPeriod[]>(`working-period/professional/${professionalId}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
    revalidatePath('/dashboard/professionals')
    return res
}

export async function GetProfessionalWorkingPeriods(professionalId: number) {
    return await serverFetch<ApiResponse<WorkingPeriod[]>>(`working-period/professional/${professionalId}/read-all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}
