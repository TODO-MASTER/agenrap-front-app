import { Service } from "@/src/features/business/types"
import { Professional } from "@/src/features/business/types/professional.types"

export type WkCtx={
    id:number,
    week:string,
    initial?:string,
    end?:string,
    userId?:number
}

export type BusinessCtx = {
    id: number,
    atSign: string,
    name: string,
    services: Service[]
    weeks: WkCtx[]
    professionals?: Professional[]
    mnrName?: string
    qtdServices?: number,
    haveAct?: boolean,
    isOwner?: boolean
    isOpenToday?: boolean
    statusMessage?: string
}