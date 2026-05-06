'use server'

import { InitialServiceReq, IServiceReq } from "@/src/shared/interfaces/requests/IServiceReq";
import { ICreateServiceRes, IDeleteServiceRes, IEditServiceRes } from "@/src/shared/interfaces/responses/IServiceRes";

import { serverFetch } from "@/src/shared/lib/serverFetch";
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx";
import { revalidatePath } from "next/cache";

export async function CreateANewService(values:IServiceReq,businessName:string){
    const res = await serverFetch<ICreateServiceRes>(`service/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.services)
    })

    revalidatePath("/business/service")
    return res

}
export async function EditServiceService(values: InitialServiceReq,rap:string,svsId:number) {
  const res = await serverFetch<IEditServiceRes>(`service/edit?rap=${rap}&svsId=${svsId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  

  revalidatePath('/dashboard/service/list');
  return res;
}

export async function DeleteServiceService(svsId:number) {
  const res = await serverFetch<IDeleteServiceRes>(`service/delete?svsId=${svsId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  

  revalidatePath('/dashboard/service/list');
  return res;
}

export async function GetServicePerRap(rap:string) {
  const res =  await serverFetch<IBusinessCtx>(`business/per?businessName=${rap}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}