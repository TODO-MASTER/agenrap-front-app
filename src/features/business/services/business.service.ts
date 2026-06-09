'use server'

import { revalidatePath } from 'next/cache';

import { serverFetch } from '@/src/shared/lib/server-fetch.lib';
import { BusinessRes, CreateBusinessReq, CreateBusinessRes } from '@/src/features/business/types/business.types';
import { ApiResponse } from '@/src/shared/types';
import { normalizePublicHandle } from '@/src/shared/utils/formatters.utils';



export async function createBusinessByUrlAction(values: CreateBusinessReq) {
  const res = await serverFetch<CreateBusinessRes>('business/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  

  revalidatePath('/business/booking-link');
  return res;
}

export async function deleteCustomerAsync(rap: string, customerId: number) {
    const res = await serverFetch<ApiResponse<boolean>>(
        `customer/${customerId}?atSign=${normalizePublicHandle(rap)}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
    )
    revalidatePath(`/dashboard/customers`)
    return res
}
