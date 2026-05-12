'use server'

import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { BusinessCtx } from "@/src/shared/types";

export async function GetBusinessPerRap(rap:string) {
  const res =  await serverFetch<BusinessCtx>(`business/per?businessName=${rap}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  });

  return res;
}