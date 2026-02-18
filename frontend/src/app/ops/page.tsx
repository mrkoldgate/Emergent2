"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { OpsView } from "@/components/ops-view";
import { SuggestedTasksView } from "@/components/suggested-tasks-view";
import { CalendarView } from "@/components/calendar-view";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Settings2, ListTodo, Calendar } from "lucide-react";

const tabs = [
  { id: "operations", label: "Operations", icon: <Settings2 className="h-3.5 w-3.5" /> },
  { id: "tasks", label: "Tasks", icon: <ListTodo className="h-3.5 w-3.5" /> },
  { id: "calendar", label: "Calendar", icon: <Calendar className="h-3.5 w-3.5" /> },
];

export default function OpsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "operations";

  const [serverHealth, setServerHealth] = useState<any[]>([]);
  const [branchStatus, setBranchStatus] = useState<any[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [suggestedTasks, setSuggestedTasks] = useState<any[]>([]);

  const calendarEvents = useQuery(api.calendarEvents.list, {});

  const fetchOpsData = useCallback(async () => {
    try {
      const [systemRes, tasksRes] = await Promise.all([
        fetch("/api/system-state").then((r) => r.json()),
        fetch("/api/suggested-tasks").then((r) => r.json()),
      ]);

      setServerHealth(
        systemRes.services?.map((s: any) => ({
          ...s,
          uptime: "24h",
          memory: Math.floor(Math.random() * 40) + 20,
        })) || []
      );

      setSuggestedTasks(tasksRes.tasks || []);

      // Mock data for branch status, observations, priorities
      setBranchStatus([
        { repo: "openclaw-dashboard", branch: "main", ahead: 0, behind: 0, dirty: false },
        { repo: "agent-memory", branch: "feature/compression", ahead: 3, behind: 1, dirty: true },
        { repo: "content-pipeline", branch: "main", ahead: 0, behind: 2, dirty: false },
      ]);

      setObservations([
        { id: "1", content: "Agent memory usage increased 15% over last week", timestamp: Date.now() - 3600000, priority: "medium" as const },
        { id: "2", content: "Telegram integration experiencing intermittent delays", timestamp: Date.now() - 7200000, priority: "high" as const },
        { id: "3", content: "Content generation quality improved after prompt update", timestamp: Date.now() - 86400000, priority: "low" as const },
      ]);

      setPriorities([
        { id: "1", title: "Complete dashboard MVP", status: "active" as const, category: "Product" },
        { id: "2", title: "Optimize token costs", status: "active" as const, category: "Operations" },
        { id: "3", title: "Launch content automation", status: "blocked" as const, category: "Content" },
        { id: "4", title: "Client onboarding flow", status: "completed" as const, category: "Clients" },
      ]);
    } catch (error) {
      console.error("Error fetching ops data:", error);
    }
  }, []);

  useEffect(() => {
    fetchOpsData();
  }, [fetchOpsData]);

  const handleTabChange = (tabId: string) => {
    router.push(`/ops?tab=${tabId}`);
  };

  const handleApproveTask = async (id: string) => {
    await fetch("/api/suggested-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "approve" }),
    });
    fetchOpsData();
  };

  const handleRejectTask = async (id: string) => {
    await fetch("/api/suggested-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "reject" }),
    });
    fetchOpsData();
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
          <h1 className="text-xl font-semibold text-white/90">Operations</h1>
          <p className="text-sm text-white/50 mt-0.5">
            System operations, tasks, and scheduling
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Tab Content */}
      {activeTab === "operations" && (
        <OpsView
          serverHealth={serverHealth}
          branchStatus={branchStatus}
          observations={observations}
          priorities={priorities}
        />
      )}

      {activeTab === "tasks" && (
        <SuggestedTasksView
          tasks={suggestedTasks}
          onApprove={handleApproveTask}
          onReject={handleRejectTask}
        />
      )}

      {activeTab === "calendar" && (
        <CalendarView events={calendarEvents || []} />
      )}
    </motion.div>
  );
}
