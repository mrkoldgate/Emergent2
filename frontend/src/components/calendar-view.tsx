"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface CalendarEvent {
  _id: string;
  title: string;
  start: number;
  end: number;
  type: string;
  color?: string;
  allDay?: boolean;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onCreateEvent?: (date: Date) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
}

const typeColors: Record<string, string> = {
  meeting: "bg-blue-500/20 border-blue-500/40 text-blue-400",
  task: "bg-purple-500/20 border-purple-500/40 text-purple-400",
  maintenance: "bg-amber-500/20 border-amber-500/40 text-amber-400",
  deadline: "bg-red-500/20 border-red-500/40 text-red-400",
  personal: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
};

export function CalendarView({ events, onCreateEvent, onSelectEvent }: CalendarViewProps) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getEventsForDay = (date: Date) => {
    const dayStart = new Date(date).setHours(0, 0, 0, 0);
    const dayEnd = new Date(date).setHours(23, 59, 59, 999);
    return events.filter((event) => {
      return event.start >= dayStart && event.start <= dayEnd;
    });
  };

  const getEventPosition = (event: CalendarEvent) => {
    const eventDate = new Date(event.start);
    const hour = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const top = ((hour - 8) * 60 + minutes) * (48 / 60); // 48px per hour
    
    const duration = (event.end - event.start) / (1000 * 60); // duration in minutes
    const height = Math.max(duration * (48 / 60), 20); // minimum height 20px
    
    return { top, height };
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.06]">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-400" />
          Calendar
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs text-white/70 min-w-[120px] text-center">
            {startOfWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex">
          {/* Time Column */}
          <div className="w-14 shrink-0 border-r border-white/[0.06]">
            <div className="h-10 border-b border-white/[0.06]" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 flex items-start justify-end pr-2 text-[10px] text-white/30"
              >
                {hour % 12 || 12}{hour >= 12 ? "PM" : "AM"}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <ScrollArea className="flex-1">
            <div className="flex min-w-[600px]">
              {weekDays.map((date, dayIndex) => {
                const isToday = date.toDateString() === today.toDateString();
                const dayEvents = getEventsForDay(date);

                return (
                  <div key={dayIndex} className="flex-1 min-w-[80px] border-r border-white/[0.04] last:border-r-0">
                    {/* Day Header */}
                    <div
                      className={`h-10 flex flex-col items-center justify-center border-b border-white/[0.06] ${
                        isToday ? "bg-blue-500/5" : ""
                      }`}
                    >
                      <span className="text-[10px] text-white/40 uppercase">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isToday ? "text-blue-400" : "text-white/70"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </div>

                    {/* Hours Grid */}
                    <div className="relative">
                      {hours.map((hour) => (
                        <div
                          key={hour}
                          className="h-12 border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer"
                          onClick={() => {
                            const clickDate = new Date(date);
                            clickDate.setHours(hour);
                            onCreateEvent?.(clickDate);
                          }}
                        />
                      ))}

                      {/* Events */}
                      {dayEvents.map((event) => {
                        const { top, height } = getEventPosition(event);
                        const colorClass = typeColors[event.type] || typeColors.meeting;

                        return (
                          <motion.div
                            key={event._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`absolute left-1 right-1 rounded-lg border px-1.5 py-1 cursor-pointer overflow-hidden ${colorClass}`}
                            style={{ top: `${top}px`, height: `${height}px` }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectEvent?.(event);
                            }}
                          >
                            <p className="text-[10px] font-medium truncate">
                              {event.title}
                            </p>
                            {height > 30 && (
                              <p className="text-[9px] opacity-70">
                                {formatTime(event.start)}
                              </p>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
