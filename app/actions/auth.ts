'use server';

import { withAuth, getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';

export async function getCurrentUser() {
  const { user } = await withAuth();
  return user;
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
