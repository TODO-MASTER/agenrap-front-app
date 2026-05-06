export interface IServicesRes{
	id:number;
    name:string,
    duration:string,
    value:number
}
export interface ICreateServiceRes{
	message:string
	data:{
		alreadyInitial:boolean,
		services:IServicesRes[]
	}
}

export interface IEditServiceRes{
	message:string
	data:{
		alreadyInitial:boolean,
		service:IServicesRes
	}
}

export interface IDeleteServiceRes{
	message:string
	data:boolean
}