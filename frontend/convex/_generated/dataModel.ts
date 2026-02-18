/* eslint-disable */
/**
 * Generated data model types.
 */

export type Id<TableName extends string> = string & { __tableName: TableName };

export interface DataModel {
  activities: {
    _id: Id<"activities">;
    _creationTime: number;
    type: string;
    title: string;
    description?: string;
    metadata?: any;
    timestamp: number;
    source?: string;
    agentId?: string;
  };
  calendarEvents: {
    _id: Id<"calendarEvents">;
    _creationTime: number;
    title: string;
    description?: string;
    start: number;
    end: number;
    type: string;
    color?: string;
    allDay?: boolean;
    recurring?: string;
  };
  tasks: {
    _id: Id<"tasks">;
    _creationTime: number;
    title: string;
    description?: string;
    status: string;
    priority: string;
    category: string;
    effort?: string;
    reasoning?: string;
    nextAction?: string;
    assignedTo?: string;
    dueDate?: number;
    createdAt: number;
    updatedAt: number;
  };
  contacts: {
    _id: Id<"contacts">;
    _creationTime: number;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    role?: string;
    notes?: string;
    tags?: string[];
    lastInteraction?: number;
    source?: string;
  };
  contentDrafts: {
    _id: Id<"contentDrafts">;
    _creationTime: number;
    title: string;
    content: string;
    platform: string;
    status: string;
    scheduledFor?: number;
    publishedAt?: number;
    tags?: string[];
    author?: string;
    createdAt: number;
    updatedAt: number;
  };
  ecosystemProducts: {
    _id: Id<"ecosystemProducts">;
    _creationTime: number;
    name: string;
    slug: string;
    description?: string;
    status: string;
    health?: number;
    category?: string;
    metrics?: any;
    links?: any;
    createdAt: number;
    updatedAt: number;
  };
  chatMessages: {
    _id: Id<"chatMessages">;
    _creationTime: number;
    sessionId: string;
    role: string;
    content: string;
    channel?: string;
    timestamp: number;
    metadata?: any;
  };
  chatSessions: {
    _id: Id<"chatSessions">;
    _creationTime: number;
    title: string;
    channel: string;
    lastMessage?: string;
    messageCount: number;
    createdAt: number;
    updatedAt: number;
  };
}
