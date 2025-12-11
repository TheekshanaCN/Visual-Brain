import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';

export default async function Home() {
  // Check if user is authenticated
  const user = await getCurrentUser();

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // If user is not logged in, redirect to newboard
  redirect('/newboard');
}