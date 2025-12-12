"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSignIn, getSignUp } from "@/app/actions/auth";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  mode: "sign-in" | "sign-up";
  trigger: React.ReactNode;
}

export function AuthModal({ mode, trigger }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const authUrl = mode === "sign-in" ? await getSignIn() : await getSignUp();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to get auth url", error);
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const authUrl = mode === "sign-up" ? await getSignIn() : await getSignUp();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to get auth url", error);
      setLoading(false);
    }
  };


  const isSignIn = mode === "sign-in";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-8 shadow-xl border bg-background/95 backdrop-blur-md">
        <DialogHeader className="space-y-2 text-center">
          {/* Main Title */}
          <DialogTitle className="text-4xl leading-tight tracking-tight text-center">
            <span className="font-serif italic font-bold">Ideas</span> Into <span className="font-serif italic font-bold">Reality</span>
          </DialogTitle>

          {/* Subtitle */}
          <DialogDescription className="text-md font-bold text-muted-foreground text-center">
            {isSignIn ? (
              <>
                Log in to{" "}
                <span className="text-foreground">
                  Idea<span className="text-[#d4b999]">Forge</span>
                </span>
              </>
            ) : (
              <>
                Create your{" "}
                <span className="text-foreground">
                  Idea<span className="text-[#d4b999]">Forge</span>
                </span>{" "}
                account
              </>
            )}
          </DialogDescription>

        </DialogHeader>

        <div className="flex flex-col gap-6 pt-6">
          {/* Auth button */}
          <Button
            size="lg"
            className="w-full h-11 text-base font-medium rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSignIn ? "Log In" : "Sign Up"}
          </Button>

          {/* Switch between sign in / sign up */}
          <div className="text-center text-sm">
            {isSignIn ? (
              <>
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  onClick={handleSignup}
                  className="underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mt-2">
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
