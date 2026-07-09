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

  console.log(`[PROXY] Path: ${pathname} | Token existe: ${!!token} | Token válido: ${tokenValido} | Public: ${isPublic} | Protected: ${isProtected}`);

  if (isProtected && !tokenValido) {
    console.log(`[PROXY] Redirecionando para login - sem token válido`);
    const res = NextResponse.redirect(new URL('/login', request.url));
    if (token) res.cookies.delete('token');
    return res;
  }

  if (isPublic) {
    const pendingRap = request.cookies.get('pendingRap')?.value;
    const isPrefetch = 
      request.headers.get('Next-Router-Prefetch') === '1' || 
      request.headers.get('Purpose') === 'prefetch' ||
      request.headers.get('X-Next-Router-Prefetch') === '1';

    console.log(`[PROXY] Rota pública | pendingRap: ${!!pendingRap} | Prefetch: ${isPrefetch}`);

    if (pendingRap || isPrefetch) {
      console.log(`[PROXY] Pulando limpeza por pendingRap ou prefetch`);
      return NextResponse.next();
    }

    console.log(`[PROXY] LIMPANDO TOKEN na rota pública`);
    const response = NextResponse.next();
    if (tokenValido) response.cookies.delete('token');
    return response;
  }

  console.log(`[PROXY] Deixando passar normalmente`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|static|.*\\..*).*)'],
};