//sign-up/[[...sign-up]]/page.tsx

'use client';

import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { getClerkAppearance } from '@/lib/clerk-appearance';

export default function Page() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex items-center justify-center min-h-screen bg-background transition-colors duration-300">
            <SignUp appearance={getClerkAppearance(isDark)} />
        </div>
    );
}
