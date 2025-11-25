import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background transition-colors duration-300">
            <SignUp />
        </div>
    );
}
