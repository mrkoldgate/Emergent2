"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Package,
  ExternalLink,
  Activity,
  ChevronRight,
} from "lucide-react";

interface EcosystemProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: "active" | "development" | "concept";
  health?: number;
  category?: string;
  metrics?: Record<string, number>;
}

interface EcosystemViewProps {
  products: EcosystemProduct[];
}

const statusConfig = {
  active: { label: "Active", color: "text-emerald-400 bg-emerald-500/10" },
  development: { label: "Development", color: "text-amber-400 bg-amber-500/10" },
  concept: { label: "Concept", color: "text-white/60 bg-white/10" },
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
};

export function EcosystemView({ products }: EcosystemViewProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {products.map((product) => {
        const config = statusConfig[product.status];

        return (
          <motion.div key={product._id} variants={itemVariants}>
            <Link href={`/ecosystem/${product.slug}`}>
              <Card hover className="h-full cursor-pointer">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/[0.05]">
                        <Package className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">
                          {product.name}
                        </h3>
                        {product.category && (
                          <span className="text-[10px] text-white/40">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge className={`text-[10px] ${config.color}`}>
                      {config.label}
                    </Badge>
                  </div>

                  {product.description && (
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {product.health !== undefined && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/50">Health</span>
                        <span
                          className={
                            product.health >= 80
                              ? "text-emerald-400"
                              : product.health >= 50
                              ? "text-amber-400"
                              : "text-red-400"
                          }
                        >
                          {product.health}%
                        </span>
                      </div>
                      <Progress
                        value={product.health}
                        indicatorClassName={
                          product.health >= 80
                            ? "bg-emerald-500"
                            : product.health >= 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }
                      />
                    </div>
                  )}

                  {product.metrics && Object.keys(product.metrics).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                      {Object.entries(product.metrics).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-medium text-white/90">
                            {value.toLocaleString()}
                          </div>
                          <div className="text-[9px] text-white/40 capitalize">
                            {key.replace(/_/g, " ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] text-white/40">View Details</span>
                    <ChevronRight className="h-4 w-4 text-white/40" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
