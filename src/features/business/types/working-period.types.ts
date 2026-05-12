import { ApiResponse } from "@/src/shared/types"

export type WorkingPeriod = {
  id?: number
  week: string
  initial: string
  end: string
}

export type CreateWorkingPeriodReq = {
  weeks: WorkingPeriod[]
}

export type CreateWorkingPeriodRes = ApiResponse<{ alreadyInitial: boolean, weeks: WorkingPeriod[] }>
export type EditWorkingPeriodRes = ApiResponse<{ alreadyInitial: boolean, week: WorkingPeriod }>
export type DeleteWorkingPeriodRes = ApiResponse<{ alreadyInitial: boolean }>