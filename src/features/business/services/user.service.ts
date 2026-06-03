'use server'

import { BusinessCustomer } from "@/src/features/business/types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { PageableResponse } from "@/src/shared/types";
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils";

export async function getDashCustomersByRap(rap: string, page = 1, pageSize = 5) {
    return serverFetch<PageableResponse<BusinessCustomer[]>>(
        `user/paginated-merge?page=${page}&pageSize=${pageSize}&atSign=${normalizePublicHandle(rap)}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
}