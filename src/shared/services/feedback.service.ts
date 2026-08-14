'use server'

import { ApiResponse } from "@/src/shared/types"
import { serverAction, serverFetch } from "../lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"

export type FeedbackCategory = "Bug" | "Suggestion" | "Praise" | "Other"
export type FeedbackStatus = "New" | "Seen" | "Resolved"

export type FeedbackReq = {
    message: string
    rating: number | null
    category: FeedbackCategory | null
}

export type FeedbackRes = {
    id: number
    message: string
    rating: number | null
    category: FeedbackCategory | null
    status: FeedbackStatus
    createdAt: string
    role: string
}

export async function submitFeedback(values: FeedbackReq, atSign: string | null) {
    const query = atSign ? `?atSign=${normalizePublicHandle(atSign)}` : ""
    return await serverAction<{ id: number }>(`feedback${query}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    })
}

export async function GetMyFeedback() {
    return await serverFetch<ApiResponse<FeedbackRes[]>>(`feedback/mine`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}