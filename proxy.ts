import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that require authentication
  const isProtectedPath = path.startsWith('/bahlil') && path !== '/bahlil/login';

  if (isProtectedPath) {
    const authCookie = request.cookies.get('auth_token');
    
    // Check if cookie exists and has the correct value
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect to login page
      const loginUrl = new URL('/bahlil/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bahlil/:path*'],
};
