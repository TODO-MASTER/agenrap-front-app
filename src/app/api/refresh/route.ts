import { NextRequest, NextResponse } from 'next/server';
import { environments } from '@/src/environments/environments';

export async function POST(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const refreshToken = cookieHeader
        .split(';')
        .find(c => c.trim().startsWith('refreshToken='))
        ?.split('=')[1]
        ?.trim();

    if (!refreshToken) {
        return NextResponse.json({ error: 'Sem refresh token' }, { status: 401 });
    }

    const response = await fetch(environments.apiUrl + 'user/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Refresh inválido' }, { status: 401 });
    }

    const data = await response.json();
    const isProd = process.env.NODE_ENV === 'production';

    const res = NextResponse.json({ success: true, token: data.token });

    res.cookies.set('token', data.token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
    });

    res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}