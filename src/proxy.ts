import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/welcome', '/verify-email', '/verify-pending-email'];
const PROTECTED_ROUTES = ['/dashboard', '/business', '/appointments', '/schedule'];

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

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const tokenValido = !!token && !isTokenExpired(token);

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));

  if (isProtected && !tokenValido) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublic && tokenValido) {
    if (pathname.includes('verify')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/business/booking-link', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|static|.*\\..*).*)'],
};