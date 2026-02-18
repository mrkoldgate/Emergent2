"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  Brain,
  Cpu,
  Zap,
  ChevronRight,
  FileText,
  Shield,
  Network,
  X,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  level: "L1" | "L2" | "L3" | "L4";
  status: "active" | "idle" | "offline";
  capabilities?: string[];
  subAgents?: string[];
  soul?: string;
  rules?: string;
  recentOutputs?: Array<{ id: string; title: string; timestamp: number }>;
}

interface AgentsViewProps {
  agents: Agent[];
  onSelectAgent?: (agent: Agent) => void;
}

const levelColors = {
  L1: "text-emerald-400 bg-emerald-500/10",
  L2: "text-blue-400 bg-blue-500/10",
  L3: "text-purple-400 bg-purple-500/10",
  L4: "text-amber-400 bg-amber-500/10",
};

const statusColors = {
  active: "bg-emerald-500",
  idle: "bg-amber-500",
  offline: "bg-white/30",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

export function AgentsView({ agents, onSelectAgent }: AgentsViewProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    onSelectAgent?.(agent);
  };

  return (
    <div className="flex gap-4">
      {/* Agent Grid */}
      <div className={`flex-1 transition-all ${selectedAgent ? "lg:w-1/2" : "w-full"}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {agents.map((agent) => (
            <motion.div key={agent.id} variants={itemVariants}>
              <Card
                hover
                className="cursor-pointer"
                onClick={() => handleSelect(agent)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/[0.05]">
                        <Bot className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">
                          {agent.name}
                        </h3>
                        <p className="text-[10px] text-white/50">{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Model</span>
                      <span className="text-white/80">{agent.model}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">Level</span>
                      <Badge className={`text-[10px] ${levelColors[agent.level]}`}>
                        {agent.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] text-white/40">View Details</span>
                    <ChevronRight className="h-4 w-4 text-white/40" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Agent Detail Panel */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0, x: 50, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: 50, width: 0 }}
            className="hidden lg:block w-1/2"
          >
            <Card className="sticky top-20 h-[calc(100vh-140px)]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10">
                    <Bot className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle>{selectedAgent.name}</CardTitle>
                    <p className="text-xs text-white/50">{selectedAgent.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedAgent(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-80px)]">
                <CardContent className="p-5 space-y-5">
                  {/* Status */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-[10px] text-white/50">Model</span>
                      </div>
                      <span className="text-xs text-white/90">{selectedAgent.model}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[10px] text-white/50">Level</span>
                      </div>
                      <Badge className={`text-[10px] ${levelColors[selectedAgent.level]}`}>
                        {selectedAgent.level}
                      </Badge>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-1">
                        <Network className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-[10px] text-white/50">Status</span>
                      </div>
                      <Badge
                        variant={
                          selectedAgent.status === "active"
                            ? "success"
                            : selectedAgent.status === "idle"
                            ? "warning"
                            : "default"
                        }
                        className="text-[10px] capitalize"
                      >
                        {selectedAgent.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Soul / Personality */}
                  {selectedAgent.soul && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-pink-400" />
                        <h4 className="text-xs font-medium text-white/90">Personality (SOUL)</h4>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] text-xs text-white/70 leading-relaxed">
                        {selectedAgent.soul}
                      </div>
                    </div>
                  )}

                  {/* Rules */}
                  {selectedAgent.rules && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        <h4 className="text-xs font-medium text-white/90">Rules</h4>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] text-xs text-white/70 leading-relaxed">
                        {selectedAgent.rules}
                      </div>
                    </div>
                  )}

                  {/* Capabilities */}
                  {selectedAgent.capabilities && (
                    <div>
                      <h4 className="text-xs font-medium text-white/90 mb-2">Capabilities</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedAgent.capabilities.map((cap) => (
                          <Badge key={cap} variant="default" className="text-[10px]">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Agents */}
                  {selectedAgent.subAgents && selectedAgent.subAgents.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-white/90 mb-2">
                        Sub-Agents ({selectedAgent.subAgents.length})
                      </h4>
                      <div className="space-y-1.5">
                        {selectedAgent.subAgents.map((sub) => (
                          <div
                            key={sub}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]"
                          >
                            <Bot className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-xs text-white/70">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Outputs */}
                  {selectedAgent.recentOutputs && (
                    <div>
                      <h4 className="text-xs font-medium text-white/90 mb-2">Recent Outputs</h4>
                      <div className="space-y-1.5">
                        {selectedAgent.recentOutputs.map((output) => (
                          <div
                            key={output.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-xs text-white/70 flex-1 truncate">
                              {output.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
