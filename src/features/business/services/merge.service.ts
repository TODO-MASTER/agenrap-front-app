'use server'
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { ApiResponse } from "@/src/shared/types"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
 
export type MergePreviewCustomer = {
    customerId: number
    customerName: string
    customerTelephone: string | null
    customerEmail: string | null
    customerTotalAppointments: number
    customerTotalSpent: number
}
 
export type MergePreview = {
    userId: number
    userName: string
    userTelephone: string | null
    userEmail: string | null
    userTotalAppointments: number
    userTotalSpent: number
    customers: MergePreviewCustomer[]
    mergedTotalAppointments: number
    mergedTotalSpent: number
}
 
export type MergeCustomerRequest = {
    customerIds: number[]
    userId: number
}
 
export type MergeHistoryItem = {
    customerId: number
    customerName: string
    customerTelephone: string | null
    customerEmail:string|null
    mergedAt: string
}
 
export async function getMergePreview(rap: string, customerIds: number[], userId: number) {
    const params = new URLSearchParams({ atSign: normalizePublicHandle(rap), userId: userId.toString() })
    customerIds.forEach(id => params.append('customerIds', id.toString()))
    return await serverFetch<MergePreview>(
        `merge/preview?${params}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
}
 
export async function mergeCustomerAsync(rap: string, request: MergeCustomerRequest) {
    return await serverFetch<ApiResponse<boolean>>(
        `merge?atSign=${normalizePublicHandle(rap)}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) }
    )
}
 
export async function getMergeHistoryAsync(rap: string, userId: number) {
    return await serverFetch<MergeHistoryItem[]>(
        `merge/history?atSign=${normalizePublicHandle(rap)}&userId=${userId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
}
 
export async function revertMergeAsync(rap: string, customerId: number) {
    return await serverFetch<ApiResponse<boolean>>(
        `merge/revert?atSign=${normalizePublicHandle(rap)}&customerId=${customerId}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
    )
}