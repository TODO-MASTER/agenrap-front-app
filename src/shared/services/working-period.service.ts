'use server'
import { WorkingPeriod } from "@/src/features/business/types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { ApiResponse } from "@/src/shared/types";

export async function GetProfessionalWorkingPeriodsForBooking(professionalId: number) {
    return await serverFetch<ApiResponse<WorkingPeriod[]>>(`working-period/professional/${professionalId}/booking-read-all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}