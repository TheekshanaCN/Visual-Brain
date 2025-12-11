"use client";

import { useEffect, useState } from "react";
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
import { Loader2, ArrowRight } from "lucide-react";

interface AuthModalProps {
  mode: "sign-in" | "sign-up";
  trigger: React.ReactNode;
}

export function AuthModal({ mode, trigger }: AuthModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      // Fetch URL only when modal is opened to ensure freshness or fetch eagerly
      // For simplicity, we can fetch on click or eagerly. 
      // WorkOS URLs are usually static or generated quickly.
    }
    fetchUrl();
  }, []);

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

  const title = mode === "sign-in" ? "Welcome Back" : "Create Account";
  const desc = mode === "sign-in"
    ? "Enter your credentials to access your workspace."
    : "Get started with Visual Brain today.";
  const buttonText = mode === "sign-in" ? "Sign In" : "Sign Up";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {desc}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {/* We can add visuals here if needed */}
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              className="w-full gap-2 relative overflow-hidden"
              onClick={handleAuth}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {buttonText} with WorkOS
              <ArrowRight className="h-4 w-4 ml-auto opacity-50" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Secure authentication powered by WorkOS.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
