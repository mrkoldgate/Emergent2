"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { formatRelativeTime, formatTime } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Hash,
  Search,
} from "lucide-react";

interface Message {
  _id: string;
  role: "user" | "assistant";
  content: string;
  channel?: string;
  timestamp: number;
}

interface Session {
  _id: string;
  title: string;
  channel: string;
  lastMessage?: string;
  messageCount: number;
  updatedAt: number;
}

interface ChatCenterViewProps {
  sessions: Session[];
  messages: Message[];
  activeSessionId?: string;
  onSelectSession: (sessionId: string) => void;
  onSendMessage: (content: string) => void;
  loading?: boolean;
}

const channelIcons: Record<string, React.ReactNode> = {
  telegram: <span className="text-blue-400">TG</span>,
  discord: <span className="text-indigo-400">DC</span>,
  webchat: <span className="text-emerald-400">WC</span>,
};

export function ChatCenterView({
  sessions,
  messages,
  activeSessionId,
  onSelectSession,
  onSendMessage,
  loading,
}: ChatCenterViewProps) {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, startListening, stopListening, supported } = useSpeechRecognition({
    onResult: (transcript) => {
      setInput((prev) => prev + transcript);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group messages by date
  const groupedMessages = messages.reduce((acc, msg) => {
    const date = new Date(msg.timestamp).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex gap-4 h-[calc(100vh-160px)]">
      {/* Sessions Sidebar */}
      <Card className="w-80 shrink-0 flex flex-col">
        <CardHeader className="border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <CardTitle>Sessions</CardTitle>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredSessions.map((session) => (
              <button
                key={session._id}
                onClick={() => onSelectSession(session._id)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  activeSessionId === session._id
                    ? "bg-white/[0.08]"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-white/90 truncate">
                    {session.title}
                  </span>
                  <Badge variant="default" className="text-[9px] shrink-0">
                    {channelIcons[session.channel] || session.channel}
                  </Badge>
                </div>
                <p className="text-[10px] text-white/50 truncate">
                  {session.lastMessage || "No messages"}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] text-white/30">
                    {session.messageCount} messages
                  </span>
                  <span className="text-[9px] text-white/30">
                    {formatRelativeTime(session.updatedAt)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b border-white/[0.06] py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-400" />
              <CardTitle className="text-sm">
                {sessions.find((s) => s._id === activeSessionId)?.title || "Select a session"}
              </CardTitle>
            </div>
            {activeSessionId && (
              <Badge variant="default" className="text-[10px]">
                {messages.length} messages
              </Badge>
            )}
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[10px] text-white/30 shrink-0">{date}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <AnimatePresence>
                  {dateMessages.map((msg) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-3 mb-3 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback
                          className={
                            msg.role === "user"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }
                        >
                          {msg.role === "user" ? (
                            <User className="h-3.5 w-3.5" />
                          ) : (
                            <Bot className="h-3.5 w-3.5" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`max-w-[70%] ${
                          msg.role === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.role === "user"
                              ? "bg-blue-500/20 text-white/90 rounded-br-md"
                              : "bg-white/[0.05] text-white/80 rounded-bl-md"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div
                          className={`flex items-center gap-2 mt-1 text-[9px] text-white/30 ${
                            msg.role === "user" ? "justify-end" : ""
                          }`}
                        >
                          <span>{formatTime(msg.timestamp)}</span>
                          {msg.channel && (
                            <Badge variant="default" className="text-[8px] px-1">
                              {msg.channel}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10"
              />
              {supported && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <MicOff className="h-3.5 w-3.5 text-red-400" />
                  ) : (
                    <Mic className="h-3.5 w-3.5 text-white/50" />
                  )}
                </Button>
              )}
            </div>
            <Button variant="primary" size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <div className="flex items-center gap-2 mt-2 text-xs text-red-400">
              <span className="animate-pulse">Recording...</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
