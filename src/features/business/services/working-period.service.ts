'use server'


import { CreateWorkingPeriodReq, CreateWorkingPeriodRes, DeleteWorkingPeriodRes, EditWorkingPeriodRes, WorkingPeriod } from "@/src/features/business/types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";


export async function CreatWorkingPeriod(values:CreateWorkingPeriodReq,businessName:string){
    const res = await serverFetch<CreateWorkingPeriodRes>(`working-period/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    const data = await res;
    return data

}

export async function GetWorkingPeriodPerRap(rap:string) {
  const res =  await serverFetch<WorkingPeriod[]>(`working-period/read-all?rap=${rap}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}
export async function EditWorkingPeriodService(values:Omit<WorkingPeriod,'id'>,rap:string,wkpId:number) {
  const res = await serverFetch<EditWorkingPeriodRes>(`working-period/edit?rap=${rap}&wkpId=${wkpId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  return res;
}
export async function DeleteWkpService(rap:string,wkpId:number) {
  const res = await serverFetch<DeleteWorkingPeriodRes>(`working-period/delete?rap=${rap}&wkpId=${wkpId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}
