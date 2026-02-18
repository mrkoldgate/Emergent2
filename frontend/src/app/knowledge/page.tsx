"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { KnowledgeBase } from "@/components/knowledge-base";
import { EcosystemView } from "@/components/ecosystem-view";
import { BookOpen, Grid3X3 } from "lucide-react";

const tabs = [
  { id: "knowledge", label: "Knowledge", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "ecosystem", label: "Ecosystem", icon: <Grid3X3 className="h-3.5 w-3.5" /> },
];

// Mock data
const mockKnowledgeItems = [
  { id: "1", title: "Agent Configuration Guide", path: "docs/configuration.md", type: "file" as const, excerpt: "Complete guide to configuring your OpenClaw agent..." },
  { id: "2", title: "Memory System", path: "docs/memory/", type: "folder" as const },
  { id: "3", title: "API Reference", path: "docs/api-reference.md", type: "file" as const, excerpt: "Full API documentation for agent interactions..." },
  { id: "4", title: "Prompt Templates", path: "prompts/", type: "folder" as const },
  { id: "5", title: "Integration Examples", path: "examples/integrations.md", type: "file" as const, excerpt: "Examples of integrating with Telegram, Discord, and more..." },
];

const mockProducts = [
  { _id: "1", name: "OpenClaw Dashboard", slug: "dashboard", description: "Mission control for AI agents", status: "active" as const, health: 98, category: "Tools", createdAt: Date.now(), updatedAt: Date.now() },
  { _id: "2", name: "Agent Memory System", slug: "memory", description: "Long-term memory for AI agents", status: "active" as const, health: 95, category: "Core", createdAt: Date.now(), updatedAt: Date.now() },
  { _id: "3", name: "Content Automator", slug: "content-automator", description: "Automated content pipeline", status: "development" as const, health: 75, category: "Tools", createdAt: Date.now(), updatedAt: Date.now() },
  { _id: "4", name: "Client Portal", slug: "client-portal", description: "Self-service client dashboard", status: "concept" as const, health: 0, category: "Business", createdAt: Date.now(), updatedAt: Date.now() },
];

export default function KnowledgePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "knowledge";

  const [knowledgeItems] = useState(mockKnowledgeItems);
  const [products] = useState(mockProducts);

  const handleTabChange = (tabId: string) => {
    router.push(`/knowledge?tab=${tabId}`);
  };

  const handleSearch = (query: string) => {
    console.log("Searching:", query);
  };

  const handleSelectItem = (item: any) => {
    console.log("Selected:", item);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white/90">Knowledge</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Knowledge base and product ecosystem
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {activeTab === "knowledge" && (
        <KnowledgeBase
          items={knowledgeItems}
          onSearch={handleSearch}
          onSelect={handleSelectItem}
        />
      )}

      {activeTab === "ecosystem" && <EcosystemView products={products} />}
    </motion.div>
  );
}
