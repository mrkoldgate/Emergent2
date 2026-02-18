"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  Server,
  Bot,
  Clock,
  DollarSign,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface SystemHealth {
  services: Array<{
    name: string;
    status: "up" | "down" | "warning";
    port?: number;
    lastCheck: number;
  }>;
}

interface AgentStatus {
  total: number;
  healthy: number;
  unhealthy: number;
  activeSubAgents: number;
}

interface CronHealth {
  jobs: Array<{
    name: string;
    schedule: string;
    lastStatus: "success" | "failed";
    consecutiveErrors: number;
    lastRun: number;
  }>;
}

interface Revenue {
  current: number;
  monthlyBurn: number;
  net: number;
  trend: number;
}

interface ContentPipeline {
  draft: number;
  review: number;
  approved: number;
  published: number;
}

interface QuickStats {
  totalTasks: number;
  pendingApprovals: number;
  activeSessions: number;
  uptime: string;
}

interface DashboardOverviewProps {
  systemHealth?: SystemHealth | null;
  agentStatus?: AgentStatus | null;
  cronHealth?: CronHealth | null;
  revenue?: Revenue | null;
  contentPipeline?: ContentPipeline | null;
  quickStats?: QuickStats | null;
  loading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

function StatusIndicator({ status }: { status: "up" | "down" | "warning" }) {
  const colors = {
    up: "bg-emerald-500",
    down: "bg-red-500",
    warning: "bg-amber-500",
  };

  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[status]} opacity-75`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status]}`} />
    </span>
  );
}

export function DashboardOverview({
  systemHealth,
  agentStatus,
  cronHealth,
  revenue,
  contentPipeline,
  quickStats,
  loading = false,
}: DashboardOverviewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {/* System Health */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-400" />
              System Health
            </CardTitle>
            <Badge variant="success" className="text-[10px]">
              {systemHealth?.services.filter((s) => s.status === "up").length || 0}/
              {systemHealth?.services.length || 0} UP
            </Badge>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {systemHealth?.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={service.status} />
                      <span className="text-xs text-white/80">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.port && (
                        <span className="text-[10px] text-white/40">:{service.port}</span>
                      )}
                      <span className="text-[10px] text-white/30">
                        {formatRelativeTime(service.lastCheck)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agent Status */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-400" />
              Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02]">
                  <div className="text-2xl font-semibold text-white">
                    {agentStatus?.total || 0}
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Total Agents
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02]">
                  <div className="text-2xl font-semibold text-emerald-400">
                    {agentStatus?.activeSubAgents || 0}
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Sub-Agents
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Health Ratio</span>
                  <span className="text-white/80">
                    {agentStatus?.healthy || 0}/{agentStatus?.total || 0}
                  </span>
                </div>
                <Progress
                  value={
                    agentStatus?.total
                      ? (agentStatus.healthy / agentStatus.total) * 100
                      : 0
                  }
                  indicatorClassName="bg-emerald-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cron Health */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Cron Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {cronHealth?.jobs.map((job) => (
                  <div
                    key={job.name}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      {job.lastStatus === "success" ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-400" />
                      )}
                      <span className="text-xs text-white/80 truncate max-w-[100px]">
                        {job.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/40">{job.schedule}</span>
                      {job.consecutiveErrors > 0 && (
                        <Badge variant="danger" className="text-[9px] px-1.5">
                          {job.consecutiveErrors} err
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

      {/* Revenue Tracker */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Revenue Tracker
            </CardTitle>
            {revenue?.trend !== undefined && (
              <Badge
                variant={revenue.trend >= 0 ? "success" : "danger"}
                className="text-[10px]"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                {revenue.trend >= 0 ? "+" : ""}
                {revenue.trend}%
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-2xl font-semibold text-white">
                  ${revenue?.current?.toLocaleString() || 0}
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">
                  Current Revenue
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-sm font-medium text-red-400">
                    -${revenue?.monthlyBurn?.toLocaleString() || 0}
                  </div>
                  <div className="text-[10px] text-white/40">Monthly Burn</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div
                    className={`text-sm font-medium ${
                      (revenue?.net || 0) >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    ${revenue?.net?.toLocaleString() || 0}
                  </div>
                  <div className="text-[10px] text-white/40">Net</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Pipeline */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              Content Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Draft", count: contentPipeline?.draft || 0, color: "text-white/60" },
                { label: "Review", count: contentPipeline?.review || 0, color: "text-amber-400" },
                { label: "Approved", count: contentPipeline?.approved || 0, color: "text-blue-400" },
                { label: "Published", count: contentPipeline?.published || 0, color: "text-emerald-400" },
              ].map((stage) => (
                <div
                  key={stage.label}
                  className="p-2 rounded-xl bg-white/[0.02] text-center"
                >
                  <div className={`text-xl font-semibold ${stage.color}`}>
                    {stage.count}
                  </div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">
                    {stage.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/[0.05] flex overflow-hidden">
              {[
                { width: contentPipeline?.draft || 0, color: "bg-white/20" },
                { width: contentPipeline?.review || 0, color: "bg-amber-500" },
                { width: contentPipeline?.approved || 0, color: "bg-blue-500" },
                { width: contentPipeline?.published || 0, color: "bg-emerald-500" },
              ].map((seg, i) => {
                const total =
                  (contentPipeline?.draft || 0) +
                  (contentPipeline?.review || 0) +
                  (contentPipeline?.approved || 0) +
                  (contentPipeline?.published || 0);
                const percent = total > 0 ? (seg.width / total) * 100 : 0;
                return (
                  <div
                    key={i}
                    className={`${seg.color} transition-all`}
                    style={{ width: `${percent}%` }}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-xl font-semibold text-white">
                  {quickStats?.totalTasks || 0}
                </div>
                <div className="text-[10px] text-white/50">Total Tasks</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-xl font-semibold text-amber-400">
                  {quickStats?.pendingApprovals || 0}
                </div>
                <div className="text-[10px] text-white/50">Pending</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-xl font-semibold text-blue-400">
                  {quickStats?.activeSessions || 0}
                </div>
                <div className="text-[10px] text-white/50">Sessions</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-xl font-semibold text-emerald-400">
                  {quickStats?.uptime || "0d"}
                </div>
                <div className="text-[10px] text-white/50">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
