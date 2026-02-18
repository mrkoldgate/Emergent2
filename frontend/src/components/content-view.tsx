"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime, formatDate } from "@/lib/utils";
import {
  FileText,
  Twitter,
  Youtube,
  Mail,
  PenTool,
  Eye,
  CheckCircle,
  Globe,
  GripVertical,
  MoreHorizontal,
} from "lucide-react";

interface ContentDraft {
  _id: string;
  title: string;
  content: string;
  platform: string;
  status: "draft" | "review" | "approved" | "published";
  scheduledFor?: number;
  publishedAt?: number;
  tags?: string[];
  createdAt: number;
}

interface ContentViewProps {
  drafts: ContentDraft[];
  onUpdateStatus: (id: string, status: string) => void;
}

const platformIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-3.5 w-3.5" />,
  youtube: <Youtube className="h-3.5 w-3.5" />,
  newsletter: <Mail className="h-3.5 w-3.5" />,
  blog: <PenTool className="h-3.5 w-3.5" />,
};

const statusConfig = {
  draft: { label: "Draft", color: "text-white/60 bg-white/10", icon: FileText },
  review: { label: "Review", color: "text-amber-400 bg-amber-500/10", icon: Eye },
  approved: { label: "Approved", color: "text-blue-400 bg-blue-500/10", icon: CheckCircle },
  published: { label: "Published", color: "text-emerald-400 bg-emerald-500/10", icon: Globe },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function ContentView({ drafts, onUpdateStatus }: ContentViewProps) {
  const columns = ["draft", "review", "approved", "published"] as const;

  const groupedDrafts = drafts.reduce((acc, draft) => {
    if (!acc[draft.status]) acc[draft.status] = [];
    acc[draft.status].push(draft);
    return acc;
  }, {} as Record<string, ContentDraft[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((status) => {
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        const columnDrafts = groupedDrafts[status] || [];

        return (
          <div key={status} className="space-y-3">
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${config.color}`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-white/90">{config.label}</span>
              </div>
              <Badge variant="default" className="text-[10px]">
                {columnDrafts.length}
              </Badge>
            </div>

            {/* Cards */}
            <ScrollArea className="h-[calc(100vh-280px)]">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-2 pr-2"
              >
                {columnDrafts.map((draft) => (
                  <motion.div key={draft._id} variants={itemVariants}>
                    <Card hover className="cursor-pointer">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/40">
                              {platformIcons[draft.platform] || <FileText className="h-3.5 w-3.5" />}
                            </span>
                            <span className="text-[10px] text-white/50 capitalize">
                              {draft.platform}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3.5 w-3.5 text-white/40" />
                          </Button>
                        </div>

                        <h4 className="text-xs font-medium text-white/90 leading-snug line-clamp-2">
                          {draft.title}
                        </h4>

                        <p className="text-[10px] text-white/50 line-clamp-2 leading-relaxed">
                          {draft.content}
                        </p>

                        {draft.tags && draft.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {draft.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="default" className="text-[9px] px-1.5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                          <span className="text-[9px] text-white/30">
                            {formatRelativeTime(draft.createdAt)}
                          </span>
                          {draft.scheduledFor && (
                            <span className="text-[9px] text-blue-400">
                              Scheduled: {formatDate(draft.scheduledFor)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {columnDrafts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <StatusIcon className="h-8 w-8 text-white/10 mb-2" />
                    <p className="text-xs text-white/30">No {status} items</p>
                  </div>
                )}
              </motion.div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
