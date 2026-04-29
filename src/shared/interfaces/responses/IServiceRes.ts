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