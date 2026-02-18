import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/nav";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OpenClaw Mission Control",
  description: "Command center for autonomous AI agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}>
        <Providers>
          <div className="relative min-h-screen">
            {/* Subtle grid background */}
            <div className="fixed inset-0 grid-pattern pointer-events-none opacity-50" />
            
            {/* Main content */}
            <div className="relative z-10">
              <Nav />
              <main className="mx-auto max-w-[1800px] px-4 py-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
