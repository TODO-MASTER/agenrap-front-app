'use server'
import { serverFetch } from '@/src/shared/lib/server-fetch.lib'
import { ApiResponse } from '@/src/shared/types'
import { CreateCustomerSchema } from '@/src/features/business/schemas/customer.schema'
import { normalizePublicHandle } from '@/src/shared/utils/formatters.utils'

export type CustomerRes = {
    id: number
    firstName: string
    lastName: string
    telephone: string | null
    email:string | null
    fullName: string
    initials: string
}

export type CustomerRequest = {
    firstName: string
    lastName: string
    telephone: string | null
}

export async function createCustomerAction(values: CreateCustomerSchema, rap: string) {
    return serverFetch<ApiResponse<CustomerRes>>(`customer/create?atSign=${normalizePublicHandle(rap)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    })
}

export async function updateCustomerAsync(rap: string, customerId: number, dto: CustomerRequest) {
    const res = await serverFetch<ApiResponse<CustomerRes>>(
        `customer/${customerId}?atSign=${normalizePublicHandle(rap)}`,
        { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dto) }
    )
    return res
}