"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import {
  Users,
  Building,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Plus,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company?: string;
  status: "prospect" | "contacted" | "meeting" | "proposal" | "active";
  contacts?: Array<{ name: string; email?: string; role?: string }>;
  lastInteraction?: number;
  nextAction?: string;
  value?: number;
}

interface CRMViewProps {
  clients: Client[];
  onSelectClient?: (client: Client) => void;
}

const statusConfig = {
  prospect: { label: "Prospect", color: "text-white/60 bg-white/10" },
  contacted: { label: "Contacted", color: "text-blue-400 bg-blue-500/10" },
  meeting: { label: "Meeting", color: "text-purple-400 bg-purple-500/10" },
  proposal: { label: "Proposal", color: "text-amber-400 bg-amber-500/10" },
  active: { label: "Active", color: "text-emerald-400 bg-emerald-500/10" },
};

const columns = ["prospect", "contacted", "meeting", "proposal", "active"] as const;

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

export function CRMView({ clients, onSelectClient }: CRMViewProps) {
  const groupedClients = clients.reduce((acc, client) => {
    if (!acc[client.status]) acc[client.status] = [];
    acc[client.status].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {columns.map((status) => {
        const config = statusConfig[status];
        const columnClients = groupedClients[status] || [];

        return (
          <div key={status} className="space-y-2">
            {/* Column Header */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Badge className={`text-[10px] ${config.color}`}>{config.label}</Badge>
              </div>
              <span className="text-[10px] text-white/40">{columnClients.length}</span>
            </div>

            {/* Cards */}
            <ScrollArea className="h-[calc(100vh-300px)]">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-2 pr-1"
              >
                {columnClients.map((client) => (
                  <motion.div key={client.id} variants={itemVariants}>
                    <Card
                      hover
                      className="cursor-pointer"
                      onClick={() => onSelectClient?.(client)}
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-white/10 text-white/70 text-xs">
                              {client.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-white/90 truncate">
                              {client.name}
                            </h4>
                            {client.company && (
                              <p className="text-[10px] text-white/50 truncate flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {client.company}
                              </p>
                            )}
                          </div>
                        </div>

                        {client.value && (
                          <div className="text-xs font-medium text-emerald-400">
                            ${client.value.toLocaleString()}
                          </div>
                        )}

                        {client.nextAction && (
                          <div className="p-2 rounded-lg bg-white/[0.02]">
                            <div className="text-[9px] text-white/40 mb-0.5">Next Action</div>
                            <p className="text-[10px] text-white/70 line-clamp-2">
                              {client.nextAction}
                            </p>
                          </div>
                        )}

                        {client.lastInteraction && (
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                            <span className="text-[9px] text-white/30">Last contact</span>
                            <span className="text-[9px] text-white/50">
                              {formatRelativeTime(client.lastInteraction)}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {columnClients.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Users className="h-6 w-6 text-white/10 mb-2" />
                    <p className="text-[10px] text-white/30">No clients</p>
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
