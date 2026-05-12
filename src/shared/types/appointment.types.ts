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

export type BookedDaysRes = ApiResponse<{
  days: string[]
}>