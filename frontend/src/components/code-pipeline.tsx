"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { formatRelativeTime } from "@/lib/utils";
import {
  GitBranch,
  Code,
  FileText,
  Clock,
  AlertCircle,
  ChevronRight,
  Folder,
} from "lucide-react";

interface Repository {
  id: string;
  name: string;
  path: string;
  branch: string;
  lastCommit: {
    message: string;
    timestamp: number;
    author: string;
  };
  dirtyFiles: number;
  languages: Record<string, number>;
}

interface CodePipelineProps {
  repositories: Repository[];
  onSelectRepo?: (repo: Repository) => void;
}

const languageColors: Record<string, string> = {
  typescript: "bg-blue-500",
  javascript: "bg-yellow-500",
  python: "bg-emerald-500",
  rust: "bg-orange-500",
  go: "bg-cyan-500",
  html: "bg-red-500",
  css: "bg-purple-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

export function CodePipeline({ repositories, onSelectRepo }: CodePipelineProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {repositories.map((repo) => {
        const totalLines = Object.values(repo.languages).reduce((a, b) => a + b, 0);

        return (
          <motion.div key={repo.id} variants={itemVariants}>
            <Card
              hover
              className="cursor-pointer"
              onClick={() => onSelectRepo?.(repo)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white/[0.05]">
                      <Folder className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/90">
                        {repo.name}
                      </h3>
                      <p className="text-[10px] text-white/40 truncate max-w-[180px]">
                        {repo.path}
                      </p>
                    </div>
                  </div>
                  {repo.dirtyFiles > 0 && (
                    <Badge variant="warning" className="text-[10px]">
                      {repo.dirtyFiles} dirty
                    </Badge>
                  )}
                </div>

                {/* Branch */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                  <GitBranch className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs text-white/70">{repo.branch}</span>
                </div>

                {/* Last Commit */}
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-white/40 mb-1">Last Commit</div>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {repo.lastCommit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/40">
                    <span>{repo.lastCommit.author}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(repo.lastCommit.timestamp)}</span>
                  </div>
                </div>

                {/* Language Breakdown */}
                {totalLines > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] text-white/40">Languages</div>
                    <div className="h-1.5 rounded-full bg-white/[0.05] flex overflow-hidden">
                      {Object.entries(repo.languages).map(([lang, lines]) => (
                        <div
                          key={lang}
                          className={`${languageColors[lang.toLowerCase()] || "bg-white/30"}`}
                          style={{ width: `${(lines / totalLines) * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(repo.languages).slice(0, 4).map(([lang, lines]) => (
                        <div key={lang} className="flex items-center gap-1">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              languageColors[lang.toLowerCase()] || "bg-white/30"
                            }`}
                          />
                          <span className="text-[10px] text-white/50 capitalize">
                            {lang}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {Math.round((lines / totalLines) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] text-white/40">View Details</span>
                  <ChevronRight className="h-4 w-4 text-white/40" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
