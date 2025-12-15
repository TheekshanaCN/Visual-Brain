'use server';

import { withAuth, getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';

import { syncUser } from '@/lib/user-utils';

export async function getCurrentUser() {
  const { user } = await withAuth();
  if (user) {
    const dbUser = await syncUser(user);
    // Serialize to plain object to handle MongoDB specific types like ObjectId and Date
    return JSON.parse(JSON.stringify(dbUser));
  }
  return null;
}

export async function getSignIn() {
  const url = await getSignInUrl();
  return url;
}

export async function getSignUp() {
  const url = await getSignUpUrl();
  return url;
}

export async function getSignOutUrl() {
  return '/api/auth/logout';
}
