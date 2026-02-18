"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DashboardOverview } from "@/components/dashboard-overview";
import { ActivityFeed } from "@/components/activity-feed";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function HomePage() {
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [cronHealth, setCronHealth] = useState<any>(null);
  const [revenue, setRevenue] = useState<any>(null);
  const [contentPipeline, setContentPipeline] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const activities = useQuery(api.activities.list, { limit: 20 });

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
      <ActivityFeed
        activities={activities || []}
        loading={!activities}
      />
    </motion.div>
  );
}
