import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register','/welcome'];
const PROTECTED_ROUTES = ['/dashboard', '/business', '/appointments', '/schedule'];

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  const tokenValido = token && !isTokenExpired(token);

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));

  if (isProtected && !tokenValido) {
    if (request.method === 'POST') return NextResponse.next();
    const response = NextResponse.redirect(new URL('/login', request.url));
    if (token) response.cookies.delete('token');
    return response;
  }

  if (isPublic) {
    const pendingRap = request.cookies.get('pendingRap')?.value
    if (pendingRap) return NextResponse.next()
    const response = NextResponse.next();
    response.cookies.delete('token');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};