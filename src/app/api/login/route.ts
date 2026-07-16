import { environments } from '@/src/environments/environments';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(
      environments.apiUrl + 'user/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error },
        { status: response.status }
      );
    }

    const data = await response.json();

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === 'production';

    if (data.token) {
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      });
    }

    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return NextResponse.json({ data: data });

  } catch (err) {
    return NextResponse.json(
      { error: 'Erro interno no login' },
      { status: 500 }
    );
  }
}