'use server'


import { CreateWorkingPeriodReq, CreateWorkingPeriodRes, DeleteWorkingPeriodRes, EditWorkingPeriodRes, WorkingPeriod } from "@/src/features/business/types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";


export async function CreatWorkingPeriod(values:CreateWorkingPeriodReq,atSign:string){
    const res = await serverFetch<CreateWorkingPeriodRes>(`working-period/create?atSign=${normalizePublicHandle(atSign)}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    const data = await res;
    return data

}

export async function GetWorkingPeriodPerRap(rap:string) {
  const res =  await serverFetch<WorkingPeriod[]>(`working-period/read-all?atSign=${normalizePublicHandle(rap)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}
export async function EditWorkingPeriodService(values:Omit<WorkingPeriod,'id'>,rap:string,wkpId:number) {
  const res = await serverFetch<EditWorkingPeriodRes>(`working-period/edit?atSign=${normalizePublicHandle(rap)}&wkpId=${wkpId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  return res;
}
export async function DeleteWkpService(rap:string,wkpId:number) {
  const res = await serverFetch<DeleteWorkingPeriodRes>(`working-period/delete?atSign=${normalizePublicHandle(rap)}&wkpId=${wkpId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}
