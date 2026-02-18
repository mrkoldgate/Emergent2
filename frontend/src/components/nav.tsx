"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings2,
  Bot,
  MessageSquare,
  FileText,
  Users,
  BookOpen,
  Code,
  Activity,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/ops", label: "Ops", icon: Settings2 },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/comms", label: "Comms", icon: Users },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/code", label: "Code", icon: Code },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1800px] px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="hidden md:inline text-sm font-semibold text-white/90">
              OpenClaw
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-0.5 flex-1 justify-center max-w-2xl mx-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-[clamp(0.45rem,0.75vw,0.6875rem)] font-medium transition-colors flex-1",
                    isActive
                      ? "text-blue-400 bg-blue-500/[0.08]"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">
                Auto 15s
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
