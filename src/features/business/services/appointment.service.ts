'use server'
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { ApiResponse, PageableResponse } from "@/src/shared/types"

export type AppointmentFull = {
  appointmentId: number
  serviceId: number
  userId: number
  businessId: number
  firstName: string
  lastName: string
  fullName: string
  initials: string
  telephone: string | null
  serviceName: string
  serviceValue: number
  appointmentDate: string
  appointmentHour: string
}

export type CompleteAppointmentsReq={
  businessId:number,
  appointmentIds:number[]
}



export async function getDashAppointmentsByRap(
    rap: string,
    filter: 'today' | 'completed' | null = null,
    page = 1,
    pageSize = 10,
) {
    return await serverFetch<PageableResponse<AppointmentFull[]>>(
        `appointment/paginated?page=${page}&pageSize=${pageSize}&rap=${rap}${filter ? `&filter=${filter}` : ''}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
}

export async function completeAllAppointmentsAsync(values:CompleteAppointmentsReq){
  return await serverFetch<ApiResponse<boolean>>(
    `appointment/complete`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(values)
    }
  )
}