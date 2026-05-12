import { Service } from "@/src/features/business/types"


export type WkCtx={
    id:number,
    week:string,
    initial?:string,
    end?:string,
    userId?:number
}

export type BusinessCtx= {
    id: number,
    name: string,
    services:Service[]
    weeks:WkCtx[]
    mnrName?:string
    qtdServices?: number,
    haveAct?:boolean
    
}