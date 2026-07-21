'use server'
import { CreateServiceReq, Service } from "@/src/features/business/types";
import { serverAction,} from "@/src/shared/lib/server-fetch.lib";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
import { revalidatePath } from "next/cache";

export async function CreateANewService(values:CreateServiceReq,atSign:string){
    const res = await serverAction<{ alreadyInitial: boolean, services: Service[] }>(`service/create?atSign=${normalizePublicHandle(atSign)}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.services)
    })

    revalidatePath("/business/service")
    return res

}
export async function EditServiceService(values:Omit<Service,'id'>,svsId:number) {
  const res = await serverAction<{ alreadyInitial: boolean, services: Service }>(`service/edit?svsId=${svsId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  

  revalidatePath('/dashboard/service/list');
  return res;
}

export async function DeleteServiceService(svsId:number) {
  const res = await serverAction<boolean>(`service/delete?svsId=${svsId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  

  revalidatePath('/dashboard/service/list');
  return res;
}

