export type IWkPeriod ={
    week:string,
    initial:string,
    end:string
}
export interface IWkPeriodRequestDTO{
    weeks:IWkPeriod[]
}