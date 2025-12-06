"use client";

import Link from "next/link";
import { Brain, DollarSign, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { AuthModal } from '@/components/AuthModal';

export default function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll logic if needed in the future
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#C9B59C] backdrop-blur-md z-50">
      <div className="w-full max-w-8xl mx-auto px-2 flex items-center justify-between h-[46px]">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center gap-2 rounded-md font-medium px-2"
          >
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Brain className="w-4 h-4 text-white" />
            </div>

            <span className="text-sm font-bold text-white">Visual Brain</span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-white flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Pricing
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-white flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm font-bold text-white">Untitled Project</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-white"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-white"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-white"
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
                className="gap-2 h-8 px-4 cursor-pointer bg-primary text-white"
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
