'use server'
import { IWkPeriodRequestDTO } from "@/src/shared/interfaces/requests/IWkPeriodRequestDTO";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function CreatWorkingPeriod(values:IWkPeriodRequestDTO,businessName:string){
    const res = await serverFetch(`working-period/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.weeks)
    })
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message|| "Falha tentativa de salvar periodo!")
    }
    revalidatePath("/business/expediente")
    return data

}