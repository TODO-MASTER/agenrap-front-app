'use server'

import { AppointmentCancelRes, AppointmentReq, AppointmentRes, BookedDaysRes } from "@/src/shared/types/appointment.types";
import { serverFetch } from "../lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";

export async function saveAppointment(
    values: AppointmentReq,
    serviceId: string,
    customerId: number | null,
    guestCustomerId: number | null = null
) {
    let path = 'appointment/save'
    if (guestCustomerId != null) path = `appointment/save/guest/${guestCustomerId}`
    else if (customerId != null) path = `appointment/save/customer/${customerId}`

    return await serverFetch<AppointmentRes>(`${path}?serviceId=${serviceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
}
export async function GetFullDays(serviceId: number, month: number, year: number) {
    const res = await serverFetch<BookedDaysRes>(`appointment/full-days?serviceId=${serviceId}&month=${month}&year=${year}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return res
}
export async function GetNextAppointments(
    businessId: number,
    userId: number | null = null,
    customerId: number | null = null
) {
    const params = new URLSearchParams({ businessId: businessId.toString() })
    if (userId != null) params.append('customerId', userId.toString())
    if (customerId != null) params.append('guestCustomerId', customerId.toString())

    return await serverFetch<AppointmentCancelRes>(`appointment/next-view?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}
export async function handleCancelAppointment(
    businessId: number,
    appointmentId: number,
    userId: number | null = null,
    customerGuestId: number | null = null) {
    const params = new URLSearchParams({ appointmentId: appointmentId.toString() })
    if (userId != null) params.append('customerId', userId.toString())
    if (customerGuestId != null) params.append('customerGuestId', customerGuestId.toString())
    let path = 'appointment/cancel/'
    if (userId != null) path = `appointment/cancel/`
    else if (customerGuestId != null) path = `appointment/cancel/guest/`
    const res = await serverFetch<ApiResponse<boolean>>(`${path}${businessId}?${params}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    return res;

}
