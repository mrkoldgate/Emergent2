"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CodePipeline } from "@/components/code-pipeline";

export default function CodePage() {
  // Mock repository data
  const repositories = [
    {
      id: "1",
      name: "openclaw-dashboard",
      path: "~/Desktop/Projects/openclaw-dashboard",
      branch: "main",
      lastCommit: {
        message: "feat: Add calendar view component",
        timestamp: Date.now() - 3600000,
        author: "developer",
      },
      dirtyFiles: 0,
      languages: { TypeScript: 8500, CSS: 1200, JavaScript: 300 },
    },
    {
      id: "2",
      name: "agent-memory",
      path: "~/Desktop/Projects/agent-memory",
      branch: "feature/compression",
      lastCommit: {
        message: "wip: Memory compression algorithm",
        timestamp: Date.now() - 7200000,
        author: "developer",
      },
      dirtyFiles: 3,
      languages: { Python: 4200, Rust: 1800 },
    },
    {
      id: "3",
      name: "content-pipeline",
      path: "~/Desktop/Projects/content-pipeline",
      branch: "main",
      lastCommit: {
        message: "fix: Queue processing race condition",
        timestamp: Date.now() - 86400000,
        author: "developer",
      },
      dirtyFiles: 0,
      languages: { TypeScript: 3200, Python: 2100 },
    },
    {
      id: "4",
      name: "telegram-bot",
      path: "~/Desktop/Projects/telegram-bot",
      branch: "main",
      lastCommit: {
        message: "chore: Update dependencies",
        timestamp: Date.now() - 172800000,
        author: "developer",
      },
      dirtyFiles: 1,
      languages: { JavaScript: 2800, TypeScript: 400 },
    },
    {
      id: "5",
      name: "api-gateway",
      path: "~/Desktop/Projects/api-gateway",
      branch: "develop",
      lastCommit: {
        message: "feat: Add rate limiting middleware",
        timestamp: Date.now() - 259200000,
        author: "developer",
      },
      dirtyFiles: 0,
      languages: { Go: 5600 },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white/90">Code</h1>
        <p className="text-sm text-white/50 mt-0.5">
          Repository management and code pipeline
        </p>
      </div>

      {/* Code Pipeline */}
      <CodePipeline repositories={repositories} />
    </motion.div>
  );
}
