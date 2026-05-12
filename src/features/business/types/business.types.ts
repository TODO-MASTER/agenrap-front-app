import { ApiResponse } from "@/src/shared/types"

export type CreateBusinessReq = {
  name: string
}

export type BusinessRes = {
  id: number
  name: string
  userId: number
  alreadyInitial?: boolean
}

export type CreateBusinessRes = ApiResponse<BusinessRes>
