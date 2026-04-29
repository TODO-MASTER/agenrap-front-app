'use server'

import { IWkPeriodListReq } from "@/src/shared/interfaces/requests/IWkPeriodReq";
import { IcreateWkRes } from "@/src/shared/interfaces/responses/IWkRes";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function CreatWorkingPeriod(values:IWkPeriodListReq,businessName:string){
    const res = await serverFetch<IcreateWkRes>(`working-period/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    const data = await res;
    revalidatePath("/business/hours")
    return data

}