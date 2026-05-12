'use server'

import { BusinessCustomer } from "@/src/features/business/types";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { PageableResponse } from "@/src/shared/types";

export async function getDashCustomersByRap(rap: string, page = 1, pageSize = 5) {
  const res =  await serverFetch<PageableResponse<BusinessCustomer[]>>(`user/paginated?page=${page}&pageSize=${pageSize}&rap=${rap} `, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}