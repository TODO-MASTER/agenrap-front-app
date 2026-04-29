'use server'
import { serverFetch } from '@/src/shared/lib/serverFetch';
import { IBusinessCtx } from '../../types/Business/IBusinessCtx';

export async function getBusinessPerRap(businessName: string) {
  return await serverFetch<IBusinessCtx>(`business/per?businessName=${businessName}`);
}