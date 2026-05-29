import { ApiResponse } from "@/src/shared/types"

export type CreateBusinessReq = {
  name: string
  atSign:string
}

export type BusinessRes = {
  id: number
  name: string
  atSign:string
  userId: number
  alreadyInitial?: boolean
  hasWorkingPeriods:boolean
  hasServices:boolean
}

export type CreateBusinessRes = ApiResponse<BusinessRes>
