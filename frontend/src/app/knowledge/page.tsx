"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { KnowledgeBase } from "@/components/knowledge-base";
import { EcosystemView } from "@/components/ecosystem-view";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BookOpen, Grid3X3 } from "lucide-react";

const tabs = [
  { id: "knowledge", label: "Knowledge", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "ecosystem", label: "Ecosystem", icon: <Grid3X3 className="h-3.5 w-3.5" /> },
];

export default function KnowledgePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "knowledge";

  const [knowledgeItems, setKnowledgeItems] = useState([
    { id: "1", title: "Agent Configuration Guide", path: "docs/configuration.md", type: "file" as const, excerpt: "Complete guide to configuring your OpenClaw agent..." },
    { id: "2", title: "Memory System", path: "docs/memory/", type: "folder" as const },
    { id: "3", title: "API Reference", path: "docs/api-reference.md", type: "file" as const, excerpt: "Full API documentation for agent interactions..." },
    { id: "4", title: "Prompt Templates", path: "prompts/", type: "folder" as const },
    { id: "5", title: "Integration Examples", path: "examples/integrations.md", type: "file" as const, excerpt: "Examples of integrating with Telegram, Discord, and more..." },
  ]);

  const products = useQuery(api.ecosystemProducts.list, {}) || [];

  const handleTabChange = (tabId: string) => {
    router.push(`/knowledge?tab=${tabId}`);
  };

  const handleSearch = (query: string) => {
    // Mock search
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white/90">Knowledge</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Knowledge base and product ecosystem
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Tab Content */}
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
