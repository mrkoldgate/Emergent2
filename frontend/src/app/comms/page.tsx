"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { CommsView } from "@/components/comms-view";
import { CRMView } from "@/components/crm-view";
import { MessageSquare, Users } from "lucide-react";

const tabs = [
  { id: "comms", label: "Comms", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: "crm", label: "CRM", icon: <Users className="h-3.5 w-3.5" /> },
];

export default function CommsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "comms";

  const handleTabChange = (tabId: string) => {
    router.push(`/comms?tab=${tabId}`);
  };

  // Mock data
  const discordDigest = [
    { id: "1", channel: "general", summary: "Discussion about new agent features and integration possibilities", messageCount: 45, timestamp: Date.now() - 3600000 },
    { id: "2", channel: "support", summary: "User questions about API rate limits and best practices", messageCount: 23, timestamp: Date.now() - 7200000 },
    { id: "3", channel: "showcase", summary: "Community members sharing their agent implementations", messageCount: 12, timestamp: Date.now() - 14400000 },
  ];

  const telegramMessages = [
    { id: "1", from: "Alex Chen", content: "Hey, when is the next feature release scheduled?", timestamp: Date.now() - 1800000 },
    { id: "2", from: "Sarah M", content: "The new memory system is working great, thanks!", timestamp: Date.now() - 5400000 },
    { id: "3", from: "Dev Team", content: "Build passed. Ready for deployment.", timestamp: Date.now() - 10800000 },
  ];

  const notifications = [
    { id: "1", type: "alert", title: "Memory usage approaching limit", source: "System", timestamp: Date.now() - 900000, read: false },
    { id: "2", type: "info", title: "Daily digest completed", source: "Cron", timestamp: Date.now() - 3600000, read: false },
    { id: "3", type: "success", title: "Content published successfully", source: "Content", timestamp: Date.now() - 7200000, read: true },
    { id: "4", type: "info", title: "New user signed up", source: "Auth", timestamp: Date.now() - 14400000, read: true },
  ];

  const clients = [
    { id: "1", name: "TechCorp Inc", company: "TechCorp", status: "active" as const, value: 5000, lastInteraction: Date.now() - 86400000, nextAction: "Quarterly review call" },
    { id: "2", name: "StartupXYZ", company: "StartupXYZ", status: "proposal" as const, value: 2500, lastInteraction: Date.now() - 172800000, nextAction: "Send revised proposal" },
    { id: "3", name: "Agency Co", company: "Agency Co", status: "meeting" as const, value: 3500, lastInteraction: Date.now() - 259200000, nextAction: "Schedule demo" },
    { id: "4", name: "Enterprise Ltd", company: "Enterprise Ltd", status: "contacted" as const, value: 10000, lastInteraction: Date.now() - 432000000, nextAction: "Follow up email" },
    { id: "5", name: "New Lead", company: "Unknown", status: "prospect" as const, lastInteraction: Date.now() - 86400000, nextAction: "Initial outreach" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white/90">Communications</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Messages, notifications, and client management
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Tab Content */}
      {activeTab === "comms" && (
        <CommsView
          discordDigest={discordDigest}
          telegramMessages={telegramMessages}
          notifications={notifications}
        />
      )}

      {activeTab === "crm" && <CRMView clients={clients} />}
    </motion.div>
  );
}
