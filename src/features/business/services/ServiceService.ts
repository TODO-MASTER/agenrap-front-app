'use server'
import { IServiceRequestDTO } from "@/src/shared/interfaces/requests/IServiceRequestDTO";
import { serverFetch } from "@/src/shared/lib/serverFetch";
import { revalidatePath } from "next/cache";

export async function CreateANewService(values:IServiceRequestDTO,businessName:string){
    const res = await serverFetch(`service/create?businessName=${businessName}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values.services)
    })
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message|| "Falha tentativa de salvar serviço!")
    }
    revalidatePath("/business/expediente")
    return data

}