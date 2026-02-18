"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMemo } from "react";

// Create a placeholder client for local development
const createConvexClient = () => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url || url === "https://placeholder.convex.cloud") {
    // Return a mock client that won't make real requests
    return null;
  }
  return new ConvexReactClient(url);
};

export function Providers({ children }: { children: React.ReactNode }) {
  const convex = useMemo(() => createConvexClient(), []);

  // If no Convex client, just render children without ConvexProvider
  if (!convex) {
    return (
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </ConvexProvider>
  );
}
