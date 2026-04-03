'use server'

import { revalidatePath } from 'next/cache';
import { InitialBusinessNameSchema } from '../../../shared/types/InititalBusinessFormSchema';
import { serverFetch } from '@/src/shared/lib/serverFetch';
import { IRequestCreateBusiness } from '@/src/shared/interfaces/requests/IRequestCreateBusiness';

export async function createBusinessByUrlAction(values: IRequestCreateBusiness) {
  const res = await serverFetch('business/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error('Erro ao criar negócio');

  revalidatePath('/meu-link');
  return res.json();
}