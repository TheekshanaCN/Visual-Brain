//sign-in/[[...sign-in]]/page.tsx

'use client';

import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { getClerkAppearance } from '@/lib/clerk-appearance';

export default function Page() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex items-center justify-center min-h-screen bg-accent">
            <SignIn appearance={getClerkAppearance(isDark)} />
        </div>
    );
}
