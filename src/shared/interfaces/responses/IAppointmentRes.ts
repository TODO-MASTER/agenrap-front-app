export interface IAppointmentRes {
    message: string,
    data: {
        id: number,
        name: string,
        date: string,
        hour: string
    }
}
export interface IBookedDaysRes{
    data:{
        days:string[]
    }
}

