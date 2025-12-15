"use client";

import Link from "next/link";
import { Italic, Menu, Moon, Sun, User, Coins } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { getCurrentUser, getSignIn, getSignUp, getSignOutUrl } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  // const isDark = theme === "dark"; // Unused for now or use for styling
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [signInUrl, setSignInUrl] = useState("");
  const [signUpUrl, setSignUpUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadAuth() {
      try {
        const [u, inUrl, upUrl] = await Promise.all([
          getCurrentUser(),
          getSignIn(),
          getSignUp()
        ]);
        setUser(u);
        setSignInUrl(inUrl);
        setSignUpUrl(upUrl);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAuth();
  }, []);

  const handleSignOut = async () => {
    const url = await getSignOutUrl();
    window.location.href = url;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
        ? "stone-glass py-3 shadow-stone"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:from-accent/90 hover:to-accent/40">
              <Italic className="w-5 h-5 text-accent-foreground relative z-10 transition-transform duration-300 hover:rotate-12" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 hover:opacity-50" />
            </div>
            <span className="font-serif text-2xl text-foreground">
              Idea<span className="text-[#d4b999]">Forge</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && (
            <>
              {user ? (
                <>
                  <div className="flex items-center gap-3 mr-2">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/50">
                      <Coins className="w-4 h-4" />
                      <span>{user.credits ?? 0}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 text-xs font-medium"
                      asChild
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profilePictureUrl || ""} alt={user.firstName || "User"} />
                          <AvatarFallback>{(user.firstName?.[0] || "U").toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {user.firstName && <p className="font-medium">{user.firstName} {user.lastName}</p>}
                          {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <a href={signInUrl}>Sign In</a>
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <a href={signUpUrl}>Get Started</a>
                  </Button>
                </>
              )}
            </>
          )}

        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          {/* ... (Keep existing theme toggle) ... */}
          {/* Implementing simplified mobile menu for brevity, matching logic */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href={signInUrl}>Sign In</a>
                    </Button>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <a href={signUpUrl}>Get Started</a>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
