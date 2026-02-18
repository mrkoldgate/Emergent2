"use client";

import { motion } from "framer-motion";
import { ContentView } from "@/components/content-view";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ContentPage() {
  const drafts = useQuery(api.contentDrafts.list, {}) || [];
  const updateDraft = useMutation(api.contentDrafts.update);

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateDraft({ id: id as any, status });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white/90">Content</h1>
        <p className="text-sm text-white/50 mt-0.5">
          Manage your content pipeline
        </p>
      </div>

      {/* Content Kanban */}
      <ContentView drafts={drafts} onUpdateStatus={handleUpdateStatus} />
    </motion.div>
  );
}
