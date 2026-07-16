import { NextRequest, NextResponse } from 'next/server';

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

export function proxy(request: NextRequest) {
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

    // sem nenhum cookie → manda pro login
    if (isProtected && !token && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // tem algum cookie → deixa entrar, serverFetch cuida do refresh se necessário
    if (isProtected) {
        return NextResponse.next();
    }

    // só redireciona de rota pública se o token for válido (não expirado)
    // se estiver expirado, deixa ver o login normalmente
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