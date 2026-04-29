'use server'

import { IServiceReq } from "@/src/shared/interfaces/requests/IServiceReq";
import { ICreateServiceRes } from "@/src/shared/interfaces/responses/IServiceRes";

import { serverFetch } from "@/src/shared/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function CreateANewService(values:IServiceReq,businessName:string){
    const res = await serverFetch<ICreateServiceRes>(`service/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.services)
    })

    revalidatePath("/business/hours")
    return res

}