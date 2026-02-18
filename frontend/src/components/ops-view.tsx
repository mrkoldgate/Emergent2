"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabBar } from "@/components/tab-bar";
import {
  Server,
  GitBranch,
  Eye,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
} from "lucide-react";

interface OpsViewProps {
  serverHealth?: Array<{
    name: string;
    status: "up" | "down" | "warning";
    port?: number;
    uptime?: string;
    memory?: number;
  }>;
  branchStatus?: Array<{
    repo: string;
    branch: string;
    ahead: number;
    behind: number;
    dirty: boolean;
  }>;
  observations?: Array<{
    id: string;
    content: string;
    timestamp: number;
    priority: "high" | "medium" | "low";
  }>;
  priorities?: Array<{
    id: string;
    title: string;
    status: "active" | "completed" | "blocked";
    category: string;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function StatusIcon({ status }: { status: "up" | "down" | "warning" }) {
  if (status === "up") return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === "down") return <XCircle className="h-4 w-4 text-red-400" />;
  return <AlertTriangle className="h-4 w-4 text-amber-400" />;
}

export function OpsView({ serverHealth, branchStatus, observations, priorities }: OpsViewProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {/* Server Health Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-400" />
              Server Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                    <th className="text-left py-2.5 px-3 text-white/50 font-medium">Service</th>
                    <th className="text-left py-2.5 px-3 text-white/50 font-medium">Status</th>
                    <th className="text-left py-2.5 px-3 text-white/50 font-medium">Port</th>
                    <th className="text-left py-2.5 px-3 text-white/50 font-medium">Uptime</th>
                    <th className="text-left py-2.5 px-3 text-white/50 font-medium">Memory</th>
                  </tr>
                </thead>
                <tbody>
                  {serverHealth?.map((server, i) => (
                    <tr
                      key={server.name}
                      className={i !== (serverHealth.length - 1) ? "border-b border-white/[0.04]" : ""}
                    >
                      <td className="py-2.5 px-3 text-white/80">{server.name}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon status={server.status} />
                          <span className="capitalize text-white/60">{server.status}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-white/50">{server.port || "-"}</td>
                      <td className="py-2.5 px-3 text-white/50">{server.uptime || "-"}</td>
                      <td className="py-2.5 px-3 text-white/50">
                        {server.memory ? `${server.memory}%` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Branch Status */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-purple-400" />
              Branch Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {branchStatus?.map((repo) => (
                  <div
                    key={repo.repo}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                  >
                    <div>
                      <div className="text-xs font-medium text-white/90">{repo.repo}</div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1 mt-0.5">
                        <GitBranch className="h-3 w-3" />
                        {repo.branch}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {repo.ahead > 0 && (
                        <Badge variant="success" className="text-[9px]">
                          +{repo.ahead}
                        </Badge>
                      )}
                      {repo.behind > 0 && (
                        <Badge variant="warning" className="text-[9px]">
                          -{repo.behind}
                        </Badge>
                      )}
                      {repo.dirty && (
                        <Badge variant="danger" className="text-[9px]">
                          dirty
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Observations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-amber-400" />
              Observations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {observations?.map((obs) => (
                  <div
                    key={obs.id}
                    className="p-3 rounded-xl bg-white/[0.02] border-l-2"
                    style={{
                      borderColor:
                        obs.priority === "high"
                          ? "#ef4444"
                          : obs.priority === "medium"
                          ? "#f59e0b"
                          : "#3b82f6",
                    }}
                  >
                    <p className="text-xs text-white/80 leading-relaxed">{obs.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          obs.priority === "high"
                            ? "danger"
                            : obs.priority === "medium"
                            ? "warning"
                            : "info"
                        }
                        className="text-[9px]"
                      >
                        {obs.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Priorities */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400" />
              System Priorities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {priorities?.map((priority) => (
                  <div
                    key={priority.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      {priority.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : priority.status === "blocked" ? (
                        <XCircle className="h-4 w-4 text-red-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-400" />
                      )}
                      <span className="text-xs text-white/80">{priority.title}</span>
                    </div>
                    <Badge variant="default" className="text-[9px]">
                      {priority.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
