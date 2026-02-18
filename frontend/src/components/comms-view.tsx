"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  Bell,
  Mail,
  Phone,
  Building,
  ChevronRight,
} from "lucide-react";

interface CommsViewProps {
  discordDigest?: Array<{
    id: string;
    channel: string;
    summary: string;
    messageCount: number;
    timestamp: number;
  }>;
  telegramMessages?: Array<{
    id: string;
    from: string;
    content: string;
    timestamp: number;
  }>;
  notifications?: Array<{
    id: string;
    type: string;
    title: string;
    source: string;
    timestamp: number;
    read: boolean;
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

export function CommsView({ discordDigest, telegramMessages, notifications }: CommsViewProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* Discord Digest */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10">
                <MessageSquare className="h-4 w-4 text-indigo-400" />
              </div>
              Discord Digest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {discordDigest?.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-indigo-400">
                        #{item.channel}
                      </span>
                      <Badge variant="default" className="text-[9px]">
                        {item.messageCount} msgs
                      </Badge>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                    <span className="text-[9px] text-white/30 mt-2 block">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Telegram Messages */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10">
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </div>
              Telegram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {telegramMessages?.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="bg-blue-500/20 text-blue-400 text-[10px]">
                          {msg.from.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white/90">
                            {msg.from}
                          </span>
                          <span className="text-[9px] text-white/30">
                            {formatRelativeTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10">
                <Bell className="h-4 w-4 text-amber-400" />
              </div>
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {notifications?.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl transition-colors cursor-pointer ${
                      notif.read
                        ? "bg-white/[0.02] hover:bg-white/[0.04]"
                        : "bg-white/[0.04] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs text-white/90">{notif.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="text-[9px]">
                            {notif.source}
                          </Badge>
                          <span className="text-[9px] text-white/30">
                            {formatRelativeTime(notif.timestamp)}
                          </span>
                        </div>
                      </div>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                    </div>
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
