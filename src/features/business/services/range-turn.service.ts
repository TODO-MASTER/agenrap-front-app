'use server'
import { DayOffReq, DayOffRes, TimeBlockReq, TimeBlockRes } from '@/src/features/business/types'
import { serverFetch } from '@/src/shared/lib/server-fetch.lib'
import { ApiResponse } from '@/src/shared/types'

 
export async function GetDayOffs(rap: string): Promise<ApiResponse<DayOffRes[]>> {
  return serverFetch<ApiResponse<DayOffRes[]>>(`block/day-off?rap=${rap}`)
}
 
export async function GetTimeBlocks(rap: string): Promise<ApiResponse<TimeBlockRes[]>> {
  return serverFetch<ApiResponse<TimeBlockRes[]>>(`block/time-block?rap=${rap}`)
}
 
export async function SaveDayOff(rap: string, dto: DayOffReq): Promise<ApiResponse<DayOffRes>> {
  return serverFetch<ApiResponse<DayOffRes>>(`block/day-off?rap=${rap}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}
 
export async function SaveTimeBlock(rap: string, dto: TimeBlockReq): Promise<ApiResponse<TimeBlockRes>> {
  return serverFetch<ApiResponse<TimeBlockRes>>(`block/time-block?rap=${rap}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}
 
export async function DeleteDayOff(rap: string, id: number): Promise<ApiResponse<boolean>> {
  return serverFetch<ApiResponse<boolean>>(`block/day-off/${id}?rap=${rap}`, { method: 'DELETE' })
}
 
export async function DeleteTimeBlock(rap: string, id: number): Promise<ApiResponse<boolean>> {
  return serverFetch<ApiResponse<boolean>>(`block/time-block/${id}?rap=${rap}`, { method: 'DELETE' })
}