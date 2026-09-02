import { ApiResponse } from "@/src/shared/types/api.shape.types"

export type Professional = {
  id: number
  name: string
  telephone?: string | null
  email?: string | null
  avatarColor: string
  isActive: boolean
  serviceIds: number[]
  permissionCodes: string[]
  isLinked: boolean
  userId?: number | null
  isManagerProfile:boolean
  workingPeriods?: { week: string; initial: string; end: string }[]
}

export type ProfessionalReq = {
  name: string
  telephone?: string | null
  email?: string | null
  avatarColor: string
  serviceIds: number[]
  permissionCodes: string[]
}

export type ProfessionalWkPeriodReq = {
  week: string
  initial: string
  end: string
}

export type ProfessionalWkPeriodRes = {
  id?: number
  week: string
  initial: string
  end: string
}

export type PermissionItem = {
  code: string
  group: string
  label: string
}

export type StaffBusiness = {
  businessId: number
  businessName: string
  atSign: string
  professionalId: number
  professionalName: string
  avatarColor: string
  permissionCodes: string[]
}

export type StaffContext = {
  isManager: boolean
  professionalId: number | null
  professionalName: string | null
  avatarColor?: string | null
  telephone?: string | null
  businessId: number
  atSign: string
  businessName: string
  permissionCodes: string[]
  serviceIds?: number[]
}

export type SelfEditProfessionalReq = {
  name: string
  telephone?: string | null
  avatarColor: string
}

export type ProfessionalRes = ApiResponse<Professional>
export type ProfessionalListRes = ApiResponse<Professional[]>