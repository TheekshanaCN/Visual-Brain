
import { authkitMiddleware, authkit } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

export default authkitMiddleware({
  middleware: async (req, next) => {
    const { pathname } = req.nextUrl;
    
    // Allow public access to newboard and auth endpoints
    if (pathname.startsWith('/newboard') || pathname.startsWith('/api/auth')) {
        return next();
    }

    // Check authentication
    let user = null;
    try {
        const authResponse = await authkit(req);
        user = authResponse.user;
    } catch (e) {
        // Validation failed or no session
    }

    // Root Redirects: / -> /dashboard (if authed) OR /newboard (if guest)
    if (pathname === '/') {
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } else {
            return NextResponse.redirect(new URL('/newboard', req.url));
        }
    }

    // Protected Routes
    const protectedPaths = ['/dashboard', '/projects', '/api/projects', '/api/feedback'];
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtected && !user) {
         // API routes should return 401, pages redirect
         if (pathname.startsWith('/api')) {
             return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
         }
         return NextResponse.redirect(new URL('/newboard', req.url));
    }

    return next();
  }
});

export const config = {
  matcher: [
    '/',
    '/newboard/:path*',
    '/dashboard/:path*',
    '/projects/:path*',
    '/api/:path*',
  ],
};
