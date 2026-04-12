export type InititalServiceReq={
    name:string,
    duration:string,
    value:number
}

export interface IServiceRequestDTO{
    services:InititalServiceReq[]
}