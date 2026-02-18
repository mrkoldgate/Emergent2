"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentView } from "@/components/content-view";

// Mock content drafts
const mockDrafts = [
  { _id: "1", title: "AI Agents in 2026: The Complete Guide", content: "Introduction to autonomous AI agents and how they're transforming productivity...", platform: "blog", status: "draft" as const, createdAt: Date.now() },
  { _id: "2", title: "Thread: Building with OpenClaw", content: "1/ Just shipped my first autonomous agent with @OpenClaw. Here's what I learned...", platform: "twitter", status: "review" as const, createdAt: Date.now() - 86400000 },
  { _id: "3", title: "OpenClaw Setup Tutorial", content: "In this video, I'll walk you through setting up OpenClaw from scratch...", platform: "youtube", status: "approved" as const, scheduledFor: Date.now() + 2 * 86400000, createdAt: Date.now() - 2 * 86400000 },
  { _id: "4", title: "Daily AI Digest #47", content: "Today's top stories: GPT-5.2 updates, new Claude features, and more...", platform: "newsletter", status: "published" as const, publishedAt: Date.now() - 86400000, createdAt: Date.now() - 2 * 86400000 },
  { _id: "5", title: "Agent Memory Deep Dive", content: "Understanding how OpenClaw manages long-term memory...", platform: "blog", status: "draft" as const, createdAt: Date.now() - 3 * 86400000 },
];

export default function ContentPage() {
  const [drafts, setDrafts] = useState(mockDrafts);

  const handleUpdateStatus = async (id: string, status: string) => {
    setDrafts((prev) =>
      prev.map((d) => (d._id === id ? { ...d, status: status as any } : d))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-xl font-semibold text-white/90">Content</h1>
        <p className="text-sm text-white/50 mt-0.5">
          Manage your content pipeline
        </p>
      </div>

      <ContentView drafts={drafts} onUpdateStatus={handleUpdateStatus} />
    </motion.div>
  );
}
