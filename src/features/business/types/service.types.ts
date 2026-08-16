import { ApiResponse } from "@/src/shared/types/api.shape.types"


export type Service = {
  id?: number
  name: string
  duration: string
  value: number
}
export type CreateServiceReq = {
  services: Array<{
    name: string
    duration: string
    value: number
  }>
  assignToOwnerIndexes: number[]
}
export type CreateServiceRes = ApiResponse<{ alreadyInitial: boolean, services: Service[] }>
export type EditServiceRes = ApiResponse<{ alreadyInitial: boolean, services: Service }>
export type DeleteServiceRes = ApiResponse<boolean>