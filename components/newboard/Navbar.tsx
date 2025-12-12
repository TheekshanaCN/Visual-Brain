"use client";

import Link from "next/link";
import { Brain, DollarSign, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { AuthModal } from '@/components/AuthModal';
import { SidebarTrigger } from "@/components/ui/sidebar";

interface NavbarProps {
  projectId?: string;
  projectName?: string;
  onProjectNameUpdate?: (newName: string) => void;
  tags?: string[];
}

export default function Navbar({
  projectId,
  projectName,
  onProjectNameUpdate,
  tags,
}: NavbarProps) {
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll logic if needed in the future
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 w-full stone-glass z-40 shrink-0 border-b border-border/40">
      <div className="w-full max-w-8xl mx-auto px-2 flex items-center justify-between h-[46px]">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle */}
          <SidebarTrigger className="h-8 w-8 text-foreground hover:bg-muted transition-colors" />


          <Button
            onClick={() => window.open("/pricing", "_blank")}
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Pricing
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-serif font-bold text-foreground">{projectName || "Untitled Project"}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-foreground hover:bg-muted"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-foreground hover:bg-muted"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-foreground hover:bg-muted"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>

          <AuthModal
            mode="sign-in"
            trigger={
              <Button
                variant="default"
                size="sm"
                className="gap-2 h-8 px-4 cursor-pointer bg-primary text-primary-foreground"
              >
                Login
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
