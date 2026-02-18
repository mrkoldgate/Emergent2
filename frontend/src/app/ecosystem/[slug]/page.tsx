"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TabBar } from "@/components/tab-bar";
import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Activity,
  Globe,
  Users,
  FileText,
  Shield,
  Code,
  Palette,
  ExternalLink,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "brand", label: "Brand" },
  { id: "community", label: "Community" },
  { id: "content", label: "Content" },
  { id: "product", label: "Product" },
];

export default function EcosystemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("overview");

  const product = useQuery(api.ecosystemProducts.getBySlug, { slug });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  const statusColors = {
    active: "text-emerald-400 bg-emerald-500/10",
    development: "text-amber-400 bg-amber-500/10",
    concept: "text-white/60 bg-white/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Link */}
      <Link
        href="/knowledge?tab=ecosystem"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ecosystem
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/[0.05]">
            <Package className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white/90">{product.name}</h1>
            <p className="text-sm text-white/50 mt-1">{product.description}</p>
          </div>
        </div>
        <Badge className={`text-xs ${statusColors[product.status as keyof typeof statusColors]}`}>
          {product.status}
        </Badge>
      </div>

      {/* Tabs */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-3xl font-semibold text-white">
                  {product.health || 0}%
                </div>
                <Progress
                  value={product.health || 0}
                  indicatorClassName={
                    (product.health || 0) >= 80
                      ? "bg-emerald-500"
                      : (product.health || 0) >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-400" />
                Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="info" className="text-sm">
                {product.category || "Uncategorized"}
              </Badge>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-400" />
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-white/70">
                {new Date(product.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          {product.metrics && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(product.metrics).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl bg-white/[0.02]">
                      <div className="text-2xl font-semibold text-white">
                        {(value as number).toLocaleString()}
                      </div>
                      <div className="text-xs text-white/50 capitalize mt-1">
                        {key.replace(/_/g, " ")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab !== "overview" && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-white/30 text-sm">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
