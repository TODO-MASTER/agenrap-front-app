'use server'
import { ContactSchema } from '@/src/features/customers/schemas/customer-profile.schema';
import { serverAction, serverFetch } from '@/src/shared/lib/server-fetch.lib';
import { ApiResponse } from '@/src/shared/types';

export type UserAuthRes={
    id:number,
    firstName:string,
    lastName:string,
    telephone:string,
    fullName:string,
    initials:string,
    email:string,
    role:string,

}

export async function getOne() {
  const res = await serverFetch<UserAuthRes>('user/get-one', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}
export async function UpdateProfileAction(values: ContactSchema) {
    return await serverAction<boolean>('user/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    })
}


export async function ChangePasswordAction(currentPassword: string, newPassword: string) {
    return await serverAction<boolean>('user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
    })
}

export async function forgotPasswordAction(email: string) {
    return serverAction<null>('user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        auth: false,
    })
}

export async function resetPasswordAction(token: string, newPassword: string) {
    return serverAction<null>('user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
        auth: false,
    })
}