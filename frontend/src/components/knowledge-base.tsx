"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  BookOpen,
  FileText,
  Folder,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  path: string;
  type: "file" | "folder";
  excerpt?: string;
  lastModified?: number;
}

interface KnowledgeBaseProps {
  items: KnowledgeItem[];
  onSearch: (query: string) => void;
  onSelect: (item: KnowledgeItem) => void;
}

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

export function KnowledgeBase({ items, onSearch, onSelect }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-320px)]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => onSelect(item)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  <div className="mt-0.5">
                    {item.type === "folder" ? (
                      <Folder className="h-4 w-4 text-amber-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-medium text-white/90 truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[10px] text-white/40 truncate mt-0.5">
                      {item.path}
                    </p>
                    {item.excerpt && (
                      <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />
                </motion.div>
              ))}

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-10 w-10 text-white/10 mb-3" />
                  <p className="text-sm text-white/40">No results found</p>
                  <p className="text-xs text-white/30 mt-1">Try a different search query</p>
                </div>
              )}
            </motion.div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
