"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { AgentsView } from "@/components/agents-view";
import { ModelsView } from "@/components/models-view";
import { Bot, Cpu } from "lucide-react";

const tabs = [
  { id: "agents", label: "Agents", icon: <Bot className="h-3.5 w-3.5" /> },
  { id: "models", label: "Models", icon: <Cpu className="h-3.5 w-3.5" /> },
];

export default function AgentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "agents";

  const [agents, setAgents] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgents(data.agents || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, []);

  useEffect(() => {
    fetchAgents();

    // Mock models data
    setModels([
      { id: "1", name: "Claude Sonnet 4.5", provider: "Anthropic", type: "primary" as const, costPerToken: 0.000003, latencyMs: 450, routing: ["General", "Writing", "Analysis"], status: "active" as const, usage: { tokens: 1250000, cost: 3.75, requests: 420 } },
      { id: "2", name: "GPT-5.2", provider: "OpenAI", type: "primary" as const, costPerToken: 0.00000175, latencyMs: 380, routing: ["Code", "Research"], status: "active" as const, usage: { tokens: 890000, cost: 1.56, requests: 310 } },
      { id: "3", name: "Claude Opus 4.5", provider: "Anthropic", type: "fallback" as const, costPerToken: 0.000015, latencyMs: 520, routing: ["Complex Analysis"], status: "active" as const, usage: { tokens: 120000, cost: 1.80, requests: 45 } },
      { id: "4", name: "GPT-4o", provider: "OpenAI", type: "fallback" as const, costPerToken: 0.000005, latencyMs: 320, routing: ["Quick Tasks"], status: "degraded" as const, usage: { tokens: 450000, cost: 2.25, requests: 180 } },
    ]);
  }, [fetchAgents]);

  const handleTabChange = (tabId: string) => {
    router.push(`/agents?tab=${tabId}`);
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
          <h1 className="text-xl font-semibold text-white/90">Agents</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Manage agents and model configurations
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Tab Content */}
      {activeTab === "agents" && <AgentsView agents={agents} />}
      {activeTab === "models" && <ModelsView models={models} />}
    </motion.div>
  );
}
