import { ApiResponse } from "@/src/shared/types/api.shape.types"
export type Professional = {
  id: number
  name: string
  telephone?: string | null
  avatarColor: string
  isActive: boolean
  serviceIds: number[]
}

export type ProfessionalReq = {
  name: string
  telephone?: string | null
  avatarColor: string
  serviceIds: number[]
}

export type ProfessionalRes = ApiResponse<Professional>
export type ProfessionalListRes = ApiResponse<Professional[]>