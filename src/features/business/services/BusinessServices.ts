'use server'

import { revalidatePath } from 'next/cache';

import { serverFetch } from '@/src/shared/lib/serverFetch';
import { ICreateBusinessReq } from '@/src/shared/interfaces/requests/ICreateBusinessReq';
import { IBusinessFullRes } from '@/src/shared/interfaces/responses/IBusinessRes';


export async function createBusinessByUrlAction(values: ICreateBusinessReq) {
  const res = await serverFetch<IBusinessFullRes>('business/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  

  revalidatePath('/business/booking-link');
  return res;
}
