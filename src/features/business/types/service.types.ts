import { ApiResponse } from "@/src/shared/types/api.shape.types"


export type Service = {
  id?: number
  name: string
  duration: string
  value: number
}
export type CreateServiceReq = {
  services: Service[]
}
export type CreateServiceRes = ApiResponse<{ alreadyInitial: boolean, services: Service[] }>
export type EditServiceRes = ApiResponse<{ alreadyInitial: boolean, services: Service }>
export type DeleteServiceRes = ApiResponse<boolean>