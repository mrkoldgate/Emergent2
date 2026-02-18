"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";
import {
  Activity,
  Bot,
  MessageSquare,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

interface Activity {
  _id: string;
  type: string;
  title: string;
  description?: string;
  source?: string;
  timestamp: number;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
  agent: <Bot className="h-3.5 w-3.5 text-purple-400" />,
  message: <MessageSquare className="h-3.5 w-3.5 text-blue-400" />,
  cron: <Clock className="h-3.5 w-3.5 text-amber-400" />,
  task: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
  content: <FileText className="h-3.5 w-3.5 text-pink-400" />,
  system: <Zap className="h-3.5 w-3.5 text-yellow-400" />,
  error: <AlertCircle className="h-3.5 w-3.5 text-red-400" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export function ActivityFeed({ activities, loading }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-blue-400" />
          Activity Feed
        </CardTitle>
        <Badge variant="default" className="text-[10px]">
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity._id}
                variants={itemVariants}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="mt-0.5">
                  {typeIcons[activity.type] || typeIcons.system}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/90 leading-relaxed">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-[10px] text-white/50 mt-0.5 truncate">
                      {activity.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-white/30">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                  {activity.source && (
                    <Badge variant="default" className="text-[9px] px-1.5">
                      {activity.source}
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
