import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { environments } from '@/src/environments/environments';

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return NextResponse.json({ error: 'Sem refresh token' }, { status: 401 });
    }

    const response = await fetch(environments.apiUrl + 'user/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        cookieStore.delete('token');
        cookieStore.delete('refreshToken');
        return NextResponse.json({ error: 'Refresh inválido' }, { status: 401 });
    }

    const data = await response.json();
    const isProd = process.env.NODE_ENV === 'production';

    cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
    });

    cookieStore.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, token: data.token });
}