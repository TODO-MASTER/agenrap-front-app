'use server'
import { serverFetch } from '@/src/shared/lib/server-fetch.lib';

export type UserAuthRes={
    id:number,
    name:string,
    role:string,

}

export async function getOne() {
  const res = await serverFetch<UserAuthRes>('user/get-one', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}