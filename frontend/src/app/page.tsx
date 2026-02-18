"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DashboardOverview } from "@/components/dashboard-overview";
import { ActivityFeed } from "@/components/activity-feed";

// Mock activities data when Convex is not connected
const mockActivities = [
  { _id: "1", type: "agent", title: "Agent spawned sub-agent for research task", source: "openclaw", timestamp: Date.now() - 15 * 60000 },
  { _id: "2", type: "cron", title: "Daily digest cron completed successfully", source: "scheduler", timestamp: Date.now() - 60 * 60000 },
  { _id: "3", type: "message", title: "New message received on Telegram", source: "telegram", timestamp: Date.now() - 2 * 60 * 60000 },
  { _id: "4", type: "task", title: "Content draft approved for publication", source: "content", timestamp: Date.now() - 3 * 60 * 60000 },
  { _id: "5", type: "system", title: "System health check passed", source: "monitor", timestamp: Date.now() - 4 * 60 * 60000 },
  { _id: "6", type: "agent", title: "Memory consolidation completed", source: "openclaw", timestamp: Date.now() - 5 * 60 * 60000 },
];

export default function HomePage() {
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [cronHealth, setCronHealth] = useState<any>(null);
  const [revenue, setRevenue] = useState<any>(null);
  const [contentPipeline, setContentPipeline] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activities] = useState(mockActivities);

  const fetchData = useCallback(async () => {
    try {
      const [systemRes, agentsRes, cronRes, revenueRes, contentRes] = await Promise.all([
        fetch("/api/system-state").then((r) => r.json()),
        fetch("/api/agents").then((r) => r.json()),
        fetch("/api/cron-health").then((r) => r.json()),
        fetch("/api/revenue").then((r) => r.json()),
        fetch("/api/content-pipeline").then((r) => r.json()),
      ]);

      setSystemHealth(systemRes);
      setAgentStatus(agentsRes.status);
      setCronHealth(cronRes);
      setRevenue(revenueRes);
      setContentPipeline(contentRes);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const quickStats = {
    totalTasks: 24,
    pendingApprovals: 5,
    activeSessions: 3,
    uptime: "14d 6h",
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
          <h1 className="text-xl font-semibold text-white/90">Mission Control</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Real-time overview of your OpenClaw agent system
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <DashboardOverview
        systemHealth={systemHealth}
        agentStatus={agentStatus}
        cronHealth={cronHealth}
        revenue={revenue}
        contentPipeline={contentPipeline}
        quickStats={quickStats}
        loading={loading}
      />

      {/* Activity Feed */}
      <ActivityFeed activities={activities} loading={false} />
    </motion.div>
  );
}
