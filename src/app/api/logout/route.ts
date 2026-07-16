import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { environments } from '@/src/environments/environments';

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
        await fetch(environments.apiUrl + 'user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        }).catch(() => null);
    }

    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    return NextResponse.json({ success: true });
}