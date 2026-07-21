'use server'
import { DayOffReq, DayOffRes, TimeBlockReq, TimeBlockRes } from '@/src/features/business/types'
import { serverAction, serverFetch } from '@/src/shared/lib/server-fetch.lib'
import { ApiResponse } from '@/src/shared/types'
import { normalizePublicHandle } from '@/src/shared/utils/formatters.utils'


export async function GetDayOffs(rap: string): Promise<ApiResponse<DayOffRes[]>> {
  return serverFetch<ApiResponse<DayOffRes[]>>(`turn/day-off?rap=${normalizePublicHandle(rap)}`,
{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  }
)
}

export async function GetTimeBlocks(rap: string): Promise<ApiResponse<TimeBlockRes[]>> {
  return serverFetch<ApiResponse<TimeBlockRes[]>>(`turn/time-block?rap=${normalizePublicHandle(rap)}`,
{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  }
)
}

export async function SaveDayOff(rap: string, dto: DayOffReq) {
  return serverAction<DayOffRes>(`turn/day-create?rap=${normalizePublicHandle(rap)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function SaveTimeBlock(rap: string, dto: TimeBlockReq) {
  return serverAction<TimeBlockRes>(`turn/time-block?rap=${normalizePublicHandle(rap)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function DeleteDayOff(rap: string, id: number) {
  return serverAction<boolean>(`turn/day-off/${id}?rap=${normalizePublicHandle(rap)}`,
  
  { method: 'DELETE',
 headers: { 'Content-Type': 'application/json' },
   })
}

export async function DeleteTimeBlock(rap: string, id: number) {
  return await serverAction<boolean>(`turn/time-block/${id}?rap=${normalizePublicHandle(rap)}`, { method: 'DELETE',

     headers: { 'Content-Type': 'application/json' },
   })
}