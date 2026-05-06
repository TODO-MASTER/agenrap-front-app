'use server'

import { IWkPeriodListReq, IWkPeriodReq } from "@/src/shared/interfaces/requests/IWkPeriodReq";
import { ICreateWkRes, IDeleteWkpRes, IWkActionRes, IWkPeriodRes } from "@/src/shared/interfaces/responses/IWkRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";


export async function CreatWorkingPeriod(values:IWkPeriodListReq,businessName:string){
    const res = await serverFetch<ICreateWkRes>(`working-period/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    const data = await res;
    return data

}

export async function GetWorkingPeriodPerRap(rap:string) {
  const res =  await serverFetch<IWkPeriodRes[]>(`working-period/read-all?rap=${rap}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}
export async function EditWorkingPeriodService(values: IWkPeriodReq,rap:string,wkpId:number) {
  const res = await serverFetch<IWkActionRes>(`working-period/edit?rap=${rap}&wkpId=${wkpId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  return res;
}
export async function DeleteWkpService(rap:string,wkpId:number) {
  const res = await serverFetch<IDeleteWkpRes>(`working-period/delete?rap=${rap}&wkpId=${wkpId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}
