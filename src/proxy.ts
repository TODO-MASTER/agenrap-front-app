import { NextRequest, NextResponse } from 'next/server';
import { environments } from '@/src/environments/environments';

const PUBLIC_ROUTES = ['/login', '/register', '/welcome', '/verify-email', '/verify-pending-email'];

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(
            atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        return !payload.exp || Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
}

function getUserRole(token: string): string | null {
    try {
        const payload = JSON.parse(
            atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        return payload.role || null;
    } catch {
        return null;
    }
}

async function tryRefresh(refreshToken: string): Promise<{ token: string; refreshToken: string } | null> {
    try {
        const response = await fetch(environments.apiUrl + 'user/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
            cache: 'no-store',
        });
        if (!response.ok) return null;
        const data = await response.json();
        if (!data.token || !data.refreshToken) return null;
        return data;
    } catch {
        return null;
    }
}

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const pathname = request.nextUrl.pathname;

    const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));
    const isCustomerRoute = pathname.startsWith('/@');
    const isProtected =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/business') ||
        pathname.startsWith('/appointments') ||
        pathname.startsWith('/schedule');

    if (isProtected) {
        // sem nada → login
        if (!token && !refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // token válido → passa
        if (token && !isTokenExpired(token)) {
            return NextResponse.next();
        }

        // token expirado ou ausente mas tem refreshToken → tenta renovar
        if (refreshToken) {
            const newTokens = await tryRefresh(refreshToken);

            if (!newTokens) {
                const res = NextResponse.redirect(new URL('/login', request.url));
                res.cookies.delete('token');
                res.cookies.delete('refreshToken');
                return res;
            }

            const isProd = process.env.NODE_ENV === 'production';
            const next = NextResponse.next();

            next.cookies.set('token', newTokens.token, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15,
            });

            next.cookies.set('refreshToken', newTokens.refreshToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            return next;
        }

        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isPublic && token && !isTokenExpired(token)) {
        if (pathname.includes('verify')) return NextResponse.next();
        const role = getUserRole(token);
        if (role === 'Customer') {
            return NextResponse.redirect(new URL('/appointments', request.url));
        }
        return NextResponse.redirect(new URL('/business/booking-link', request.url));
    }

    if (isCustomerRoute) return NextResponse.next();

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api|static|.*\\..*|_rsc).*)'],
};