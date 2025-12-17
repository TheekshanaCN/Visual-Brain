import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

// Public routes (unauthenticated)
const unauthenticatedPaths = ['/', '/newboard', '/pricing', '/api/pricing', '/api/stripe/webhook', '/api/auth/signin-url'];

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths,
  },
});

// Middleware matcher: runs on all app pages and APIs, ignores static files/images
export const config = {
  matcher: [
    // Match all paths except Next.js static files, images, and favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
