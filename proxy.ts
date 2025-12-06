// proxy.ts (in root directory or src/ directory if you're using it)

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/newboard(.*)',
]);

// Define protected routes (require authentication)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  // Handle root path - redirect based on auth status
  if (req.nextUrl.pathname === '/') {
    if (isSignedIn) {
      // User is signed in -> redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      // User is NOT signed in -> redirect to newboard
      return NextResponse.redirect(new URL('/newboard', req.url));
    }
  }

  // Protect dashboard routes - redirect to sign-in if not authenticated
  if (isProtectedRoute(req) && !isSignedIn) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If user is signed in and tries to access sign-in/sign-up, redirect to dashboard
  if (isSignedIn && (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};