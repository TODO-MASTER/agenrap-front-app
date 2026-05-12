'use server'

import { revalidatePath } from 'next/cache';

import { serverFetch } from '@/src/shared/lib/server-fetch.lib';
import { BusinessRes, CreateBusinessReq, CreateBusinessRes } from '@/src/features/business/types/business.types';



export async function createBusinessByUrlAction(values: CreateBusinessReq) {
  const res = await serverFetch<CreateBusinessRes>('business/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  

  revalidatePath('/business/booking-link');
  return res;
}
