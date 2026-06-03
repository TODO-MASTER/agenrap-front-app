import { ApiResponse } from "@/src/shared/types/api.shape.types"

export type AppointmentReq = {
  name:string|null
  date: string
  hour: string
}

export type AppointmentRes = ApiResponse<{
  id: number
  name: string
  date: string
  hour: string
}>

export type AppointmentCancelRes = ApiResponse<{
  userId:number|null

  appointmentId: number
  serviceId: number
  businessId:number
  customerId:number|null
  userName: string
  serviceName: string
  serviceDuration: string
  serviceValue: number
  workingPeriodWeek: string
  appointmentDate: string
  appointmentHour: string
}[]>

export type BookedDaysRes = ApiResponse<{
  days: string[]
}>