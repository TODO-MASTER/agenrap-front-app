'use server'
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { ApiResponse } from "@/src/shared/types"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"

export type SubscriptionStatusRes = {
    status: string
    hasAccess: boolean
    trialEndsAt: string | null
    currentPeriodEnd: string | null
    gracePeriodEndsAt:string|null
    isNearRenewal:boolean
    isManuallyOverridden: boolean
}

export async function getSubscriptionStatusAction(atSign: string) {
    return await serverFetch<SubscriptionStatusRes>(
        `subscription/status?atSign=${normalizePublicHandle(atSign)}`
    )
}

export async function createCheckoutAction(atSign: string) {
    return await serverFetch<ApiResponse<{ checkoutUrl: string }>>(
        `subscription/checkout?atSign=${normalizePublicHandle(atSign)}`,
        { method: 'POST' }
    )
}