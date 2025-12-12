
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signOut } from '@workos-inc/authkit-nextjs';

export async function GET() {
  // signOut method from authkit-nextjs handles cookie clearing
  await signOut();
  redirect('/');
}
