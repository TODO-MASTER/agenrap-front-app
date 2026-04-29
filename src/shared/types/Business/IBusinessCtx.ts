import { IServicesRes } from "../../interfaces/responses/IServiceRes";

export type IWkCtx={
    id:number,
    week:string,
    initial?:string,
    end?:string,
    userId?:number
}

export type IBusinessCtx= {
    id: number,
    name: string,
    services:IServicesRes[]
    weeks:IWkCtx[]
    mnrName?:string
    qtdServices?: number,
    haveAct?:boolean
    
}