"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  DollarSign,
  Clock,
  Zap,
  AlertTriangle,
} from "lucide-react";

interface Model {
  id: string;
  name: string;
  provider: string;
  type: "primary" | "fallback" | "specialized";
  costPerToken: number;
  latencyMs: number;
  routing: string[];
  status: "active" | "degraded" | "offline";
  usage?: {
    tokens: number;
    cost: number;
    requests: number;
  };
}

interface ModelsViewProps {
  models: Model[];
}

const statusColors = {
  active: "bg-emerald-500",
  degraded: "bg-amber-500",
  offline: "bg-red-500",
};

const typeColors = {
  primary: "text-blue-400 bg-blue-500/10",
  fallback: "text-amber-400 bg-amber-500/10",
  specialized: "text-purple-400 bg-purple-500/10",
};

export function ModelsView({ models }: ModelsViewProps) {
  const totalCost = models.reduce((acc, m) => acc + (m.usage?.cost || 0), 0);
  const totalRequests = models.reduce((acc, m) => acc + (m.usage?.requests || 0), 0);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-white/50">Models</span>
            </div>
            <div className="text-xl font-semibold text-white">{models.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-white/50">Active</span>
            </div>
            <div className="text-xl font-semibold text-emerald-400">
              {models.filter((m) => m.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-white/50">Total Cost</span>
            </div>
            <div className="text-xl font-semibold text-white">${totalCost.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-white/50">Requests</span>
            </div>
            <div className="text-xl font-semibold text-white">{totalRequests.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Models Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            Model Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Model</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Cost/1K</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Latency</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Routing</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, i) => (
                  <tr
                    key={model.id}
                    className={i !== models.length - 1 ? "border-b border-white/[0.04]" : ""}
                  >
                    <td className="py-3 px-4">
                      <span className="text-white/90 font-medium">{model.name}</span>
                    </td>
                    <td className="py-3 px-4 text-white/60">{model.provider}</td>
                    <td className="py-3 px-4">
                      <Badge className={`text-[10px] ${typeColors[model.type]}`}>
                        {model.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${statusColors[model.status]}`} />
                        <span className="text-white/60 capitalize">{model.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white/60">
                      ${(model.costPerToken * 1000).toFixed(4)}
                    </td>
                    <td className="py-3 px-4 text-white/60">{model.latencyMs}ms</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {model.routing.slice(0, 2).map((route) => (
                          <Badge key={route} variant="default" className="text-[9px]">
                            {route}
                          </Badge>
                        ))}
                        {model.routing.length > 2 && (
                          <Badge variant="default" className="text-[9px]">
                            +{model.routing.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
