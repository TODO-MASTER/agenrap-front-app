export interface IBusinessFullRes {
	message: string
	data: {
		id: number,
		name:string,
		userId:number,
		alreadyInitial:boolean
	}
}

export interface IBusinessRes {
	
		id: number,
		name:string,
		userId:number,
		alreadyInitial?:boolean
	
}


