export type IWkPeriodRes ={
    week:string,
    initial:string,
    end:string
}

export interface IcreateWkRes{
message:string
	data:{
		alreadyInitial:boolean,
		weeks:IWkPeriodRes[]
	}
}