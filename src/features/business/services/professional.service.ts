'use server'

import { ProfessionalListRes, ProfessionalRes, ProfessionalReq, ProfessionalWkPeriodRes, ProfessionalWkPeriodReq, StaffContext, StaffBusiness, Professional, SelfEditProfessionalReq  } from "@/src/features/business/types/professional.types"
import { serverAction, serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { ApiResponse } from "@/src/shared/types"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { revalidatePath } from "next/cache"

export async function GetStaffContext(atSign: string) {
  return await serverFetch<ApiResponse<StaffContext>>(
    `professional/context?atSign=${normalizePublicHandle(atSign)}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  )
}

export async function GetMyStaffBusinesses() {
  return await serverFetch<ApiResponse<StaffBusiness[]>>(
    `professional/my-staff-businesses`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  )
}


export async function CreateProfessionalService(values: ProfessionalReq, atSign: string) {
    const res = await serverAction<ProfessionalListRes['data']>(`professional/create?atSign=${normalizePublicHandle(atSign)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
    revalidatePath('/dashboard/professionals')
    return res
}

export async function GetProfessionalsByBusiness(atSign: string) {
    return await serverFetch<ProfessionalListRes>(`professional/by-business?atSign=${normalizePublicHandle(atSign)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function GetProfessionalsByService(serviceId: number) {
    return await serverFetch< ProfessionalListRes>(`professional/by-service?serviceId=${serviceId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function EditProfessionalService(professionalId: number, values: ProfessionalReq) {
    const res = await serverAction<ProfessionalRes['data']>(`professional/${professionalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
    revalidatePath('/dashboard/professionals')
    return res
}

export async function DeactivateProfessionalService(professionalId: number) {
    const res = await serverAction<boolean>(`professional/${professionalId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    revalidatePath('/dashboard/professionals')
    return res
}

export async function UpdateMyProfessionalProfile(professionalId: number, values: SelfEditProfessionalReq) {
  const res = await serverAction<Professional>(
    `professional/${professionalId}/self`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  )
  revalidatePath("/dashboard/me")
  return res
}



// export async function GetProfessionalWorkingPeriods(professionalId: number) {
//   return serverFetch<{ data: ProfessionalWkPeriodRes[] | null; message?: string }>(
//     `working-period/professional/${professionalId}`,
//     {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     }
//   )
// }

export async function CreateProfessionalWorkingPeriod(
  professionalId: number,
  payload: ProfessionalWkPeriodReq[]
) {
  const res = await serverAction<ProfessionalWkPeriodRes[]>(
    `working-period/professional/${professionalId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  )
  revalidatePath("/dashboard/professionals")
  return res
}

export async function EditProfessionalWorkingPeriod(
  professionalId: number,
  wkpId: number,
  payload: ProfessionalWkPeriodReq
) {
  const res = await serverAction<ProfessionalWkPeriodRes>(
    `working-period/professional/${professionalId}/${wkpId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  )
  revalidatePath("/dashboard/professionals")
  return res
}

export async function DeleteProfessionalWorkingPeriod(
  professionalId: number,
  wkpId: number
) {
  const res = await serverAction<boolean>(
    `working-period/professional/${professionalId}/${wkpId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  )
  revalidatePath("/dashboard/professionals")
  return res
}

export async function SyncMyServices(atSign: string, serviceIds: number[]) {
  const res = await serverAction<Professional>(
    `professional/me/services?atSign=${normalizePublicHandle(atSign)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceIds }),
    }
  )
  revalidatePath("/dashboard/me")
  return res
}
export async function AttachProfessionalService(professionalId: number, serviceId: number) {
  const res = await serverAction<Professional>(
    `professional/${professionalId}/services/${serviceId}`,
    { method: "POST", headers: { "Content-Type": "application/json" } }
  )
  revalidatePath("/dashboard/me")
  revalidatePath("/dashboard/professionals")
  return res
}

export async function DetachProfessionalService(professionalId: number, serviceId: number) {
  const res = await serverAction<Professional>(
    `professional/${professionalId}/services/${serviceId}`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  )
  revalidatePath("/dashboard/me")
  revalidatePath("/dashboard/professionals")
  return res
}