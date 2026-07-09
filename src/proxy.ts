import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/welcome', '/verify-email', '/verify-pending-email'];
const PROTECTED_ROUTES = ['/dashboard', '/business', '/appointments', '/schedule'];

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    const tokenExiste = !!token;

    const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
    const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));
    console.log(`//////////////////////////////////////////////////DEBUGGING///////////////////////////////////////////////////////////// `);
    console.log(`[proxy] ${request.method} ${pathname} | token=${tokenExiste} | isProtected=${isProtected} | isPublic=${isPublic}`);

    if (isProtected && !tokenExiste) {
        if (request.method === 'POST') return NextResponse.next();
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!isPublic && tokenExiste) {
        const pendingRap = request.cookies.get('pendingRap')?.value;
        const response = NextResponse.next();
        if (pendingRap) response.cookies.delete('pendingRap');
        return response;
    }

  if (isPublic) {
    const pendingRap = request.cookies.get('pendingRap')?.value;
    if (pendingRap) return NextResponse.next();

    const response = NextResponse.next();
    response.cookies.delete('token');
    return response;
}

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
};