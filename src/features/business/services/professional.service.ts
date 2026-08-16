'use server'

import { ProfessionalListRes, ProfessionalRes, ProfessionalReq  } from "@/src/features/business/types/professional.types"
import { serverAction, serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { revalidatePath } from "next/cache"

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
        auth: false
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