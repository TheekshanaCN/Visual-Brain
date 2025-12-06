'use client';

import { SignIn, SignUp } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { getClerkAppearance } from "@/lib/clerk-appearance";

interface AuthModalProps {
    trigger: React.ReactNode;
    mode: "sign-in" | "sign-up";
}

export function AuthModal({ trigger, mode }: AuthModalProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-[480px] p-0 bg-transparent border-none flex justify-center items-center">
                <DialogTitle className="sr-only">
                    {mode === "sign-in" ? "Sign In" : "Sign Up"}
                </DialogTitle>

                {/* Custom Styled Clerk Form */}
                <div className="w-full px-6 py-8 
                        bg-white dark:bg-[#24211E]">
                    {mode === "sign-in" ? (
                        <SignIn appearance={getClerkAppearance(isDark)} routing="hash" />
                    ) : (
                        <SignUp appearance={getClerkAppearance(isDark)} routing="hash" />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
