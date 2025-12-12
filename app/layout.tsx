import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "IdeaForge | Idea To Reality",
  description: "Turn messy ideas, notes, and links into clear, visual, structured insights with actionable next steps.",
  openGraph: {
    title: "IdeaForge",
    description: "Turn messy ideas, notes, and links into clear, visual, structured insights with actionable next steps.",
    images: ["/og-image.JPG"],
  },
};

import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthKitProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </AuthKitProvider>
  );
}
