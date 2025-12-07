"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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

      <DialogContent className="max-w-md p-0 gap-0 border-0 bg-transparent shadow-none overflow-visible">
        <VisuallyHidden>
          <DialogTitle>
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </VisuallyHidden>

        {/* Clerk Form Container */}
        <div className="relative rounded-lg border bg-card p-6 pb-12 shadow-lg">
          {/* Title Section */}
          <div className="relative z-10 -mb-6 flex flex-col items-center">
            <h2 className="mt-3 text-2xl font-bold tracking-tight mb-16">
              Your Unicorn Awaits
            </h2>
          </div>

          <div className="flex items-center justify-center">
            {mode === "sign-in" ? (
              <SignIn appearance={getClerkAppearance(isDark)} routing="hash" />
            ) : (
              <SignUp appearance={getClerkAppearance(isDark)} routing="hash" />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
