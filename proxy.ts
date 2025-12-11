import { authkitMiddleware } from '@workos-inc/authkit-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/newboard', '/'],
  },
  async afterAuth(req: NextRequest, session) {
    const path = req.nextUrl.pathname;

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/projects'];
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // If user is NOT logged in
    if (!session) {
      // If trying to access protected routes, redirect to /newboard
      if (isProtectedRoute) {
        const newboardUrl = new URL('/newboard', req.url);
        return NextResponse.redirect(newboardUrl);
      }
      // Allow access to public routes
      return NextResponse.next();
    }

    // If user IS logged in
    if (session) {
      // If on /newboard or root, redirect to /dashboard
      if (path === '/newboard' || path === '/') {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
      }
    }

    // Allow all other requests to proceed
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};