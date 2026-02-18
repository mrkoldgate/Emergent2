"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { ChatCenterView } from "@/components/chat-center-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MessageSquare, Terminal, Play, Loader2 } from "lucide-react";

const tabs = [
  { id: "chat", label: "Chat", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: "command", label: "Command", icon: <Terminal className="h-3.5 w-3.5" /> },
];

const quickCommands = [
  { label: "Check system status", command: "/status" },
  { label: "Run daily digest", command: "/run daily-digest" },
  { label: "Sync memory", command: "/memory sync" },
  { label: "List active tasks", command: "/tasks list --active" },
  { label: "Clear cache", command: "/cache clear" },
  { label: "Restart agent", command: "/agent restart" },
];

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "chat";

  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [commandInput, setCommandInput] = useState("");
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const sessions = useQuery(api.chat.listSessions, {}) || [];
  const messages = useQuery(
    api.chat.getMessages,
    activeSessionId ? { sessionId: activeSessionId } : "skip"
  ) || [];
  const sendMessage = useMutation(api.chat.sendMessage);

  const handleTabChange = (tabId: string) => {
    router.push(`/chat?tab=${tabId}`);
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  const handleSendMessage = async (content: string) => {
    if (!activeSessionId) return;
    await sendMessage({
      sessionId: activeSessionId,
      role: "user",
      content,
      channel: "webchat",
    });
  };

  const handleRunCommand = async (cmd?: string) => {
    const command = cmd || commandInput;
    if (!command.trim()) return;

    setIsRunning(true);
    setCommandOutput((prev) => [...prev, `> ${command}`, "Running..."]);

    // Simulate command execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      "/status": "All systems operational. Gateway: UP, Agents: 4/4 healthy, Memory: 2.1GB used",
      "/run daily-digest": "Daily digest job queued. Expected completion: 2 minutes",
      "/memory sync": "Memory sync complete. 142 entries consolidated, 3 archived",
      "/tasks list --active": "Active tasks: 5\n- Complete dashboard MVP (high)\n- Optimize prompts (medium)\n- Content review (low)\n- Client onboarding (medium)\n- Bug fixes (high)",
      "/cache clear": "Cache cleared. Freed 256MB",
      "/agent restart": "Agent restart initiated. ETA: 30 seconds",
    };

    const output = responses[command] || `Unknown command: ${command}. Type /help for available commands.`;
    setCommandOutput((prev) => [...prev.slice(0, -1), output]);
    setIsRunning(false);
    setCommandInput("");
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
          <h1 className="text-xl font-semibold text-white/90">Chat</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Communicate with your agent
          </p>
        </div>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Tab Content */}
      {activeTab === "chat" && (
        <ChatCenterView
          sessions={sessions}
          messages={messages}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onSendMessage={handleSendMessage}
        />
      )}

      {activeTab === "command" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Command Terminal */}
          <Card className="lg:col-span-2 h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="border-b border-white/[0.06]">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                Command Terminal
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Output */}
              <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-black/50">
                {commandOutput.length === 0 ? (
                  <div className="text-white/30">
                    Type a command or select from quick commands...
                  </div>
                ) : (
                  commandOutput.map((line, i) => (
                    <div
                      key={i}
                      className={`mb-1 ${
                        line.startsWith(">")
                          ? "text-blue-400"
                          : line === "Running..."
                          ? "text-amber-400"
                          : "text-white/70"
                      }`}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/[0.06]">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-mono text-sm">
                      $
                    </span>
                    <Input
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRunCommand()}
                      placeholder="Enter command..."
                      className="pl-7 font-mono"
                      disabled={isRunning}
                    />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => handleRunCommand()}
                    disabled={isRunning || !commandInput.trim()}
                  >
                    {isRunning ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Commands */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Commands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd.command}
                  onClick={() => handleRunCommand(cmd.command)}
                  disabled={isRunning}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors disabled:opacity-50"
                >
                  <div className="text-xs text-white/80">{cmd.label}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">
                    {cmd.command}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
