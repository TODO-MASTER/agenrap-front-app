'use server'
import { serverFetch } from '@/src/shared/lib/serverFetch';
import { IUserAuthRes } from '../../interfaces/responses/IUserRes';


export async function getOne() {
  const res = await serverFetch<IUserAuthRes>('user/get-one', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}