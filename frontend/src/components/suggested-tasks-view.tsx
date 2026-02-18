"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  Check,
  X,
  Filter,
  TrendingUp,
  Package,
  Users,
  FileText,
  Settings,
  Briefcase,
  LineChart,
  Sparkles,
} from "lucide-react";

interface SuggestedTask {
  id: string;
  title: string;
  reasoning: string;
  nextAction: string;
  category: string;
  priority: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected";
}

interface SuggestedTasksViewProps {
  tasks: SuggestedTask[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Revenue: <TrendingUp className="h-4 w-4" />,
  Product: <Package className="h-4 w-4" />,
  Community: <Users className="h-4 w-4" />,
  Content: <FileText className="h-4 w-4" />,
  Operations: <Settings className="h-4 w-4" />,
  Clients: <Briefcase className="h-4 w-4" />,
  Trading: <LineChart className="h-4 w-4" />,
  Brand: <Sparkles className="h-4 w-4" />,
};

const categoryColors: Record<string, string> = {
  Revenue: "text-emerald-400 bg-emerald-500/10",
  Product: "text-blue-400 bg-blue-500/10",
  Community: "text-purple-400 bg-purple-500/10",
  Content: "text-pink-400 bg-pink-500/10",
  Operations: "text-amber-400 bg-amber-500/10",
  Clients: "text-cyan-400 bg-cyan-500/10",
  Trading: "text-orange-400 bg-orange-500/10",
  Brand: "text-violet-400 bg-violet-500/10",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export function SuggestedTasksView({
  tasks,
  onApprove,
  onReject,
}: SuggestedTasksViewProps) {
  const [filter, setFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  const filteredTasks = tasks.filter((task) => {
    if (filter !== "all" && task.status !== filter) return false;
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false;
    return true;
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, SuggestedTask[]>);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(status)}
              className="text-xs capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <Button
            variant={categoryFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCategoryFilter("all")}
            className="text-xs"
          >
            All Categories
          </Button>
          {categories.slice(0, 4).map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Task Grid by Category */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`p-1.5 rounded-lg ${categoryColors[category] || "text-white/60 bg-white/5"}`}
                >
                  {categoryIcons[category] || <Lightbulb className="h-4 w-4" />}
                </div>
                <h3 className="text-sm font-medium text-white/90">{category}</h3>
                <Badge variant="default" className="text-[10px]">
                  {categoryTasks.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <AnimatePresence mode="popLayout">
                  {categoryTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      variants={itemVariants}
                      layout
                      exit="exit"
                    >
                      <Card hover className="h-full">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-medium text-white/90 leading-snug">
                              {task.title}
                            </h4>
                            <div className="flex gap-1 shrink-0">
                              <Badge
                                variant={
                                  task.priority === "high"
                                    ? "danger"
                                    : task.priority === "medium"
                                    ? "warning"
                                    : "default"
                                }
                                className="text-[9px]"
                              >
                                {task.priority}
                              </Badge>
                              <Badge variant="info" className="text-[9px]">
                                {task.effort}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-[11px] text-white/50 leading-relaxed">
                            {task.reasoning}
                          </p>

                          <div className="p-2 rounded-lg bg-white/[0.02]">
                            <div className="text-[10px] text-white/40 mb-1">Next Action</div>
                            <p className="text-[11px] text-white/70">{task.nextAction}</p>
                          </div>

                          {task.status === "pending" && (
                            <div className="flex gap-2 pt-1">
                              <Button
                                variant="success"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => onApprove(task.id)}
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => onReject(task.id)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}

                          {task.status !== "pending" && (
                            <Badge
                              variant={task.status === "approved" ? "success" : "danger"}
                              className="w-full justify-center text-xs py-1.5"
                            >
                              {task.status === "approved" ? "Approved" : "Rejected"}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
}
