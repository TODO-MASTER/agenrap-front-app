export type IWkPeriodReq ={
    week:string,
    initial:string,
    end:string
}
export interface IWkPeriodListReq{
    weeks:IWkPeriodReq[]
}