export type InitialServiceReq={
    name:string,
    duration:string,
    value:number
}

export interface IServiceReq{
    services:InitialServiceReq[]
}