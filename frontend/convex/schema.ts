import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    type: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    metadata: v.optional(v.any()),
    timestamp: v.number(),
    source: v.optional(v.string()),
    agentId: v.optional(v.string()),
  }).index("by_timestamp", ["timestamp"]),

  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    start: v.number(),
    end: v.number(),
    type: v.string(),
    color: v.optional(v.string()),
    allDay: v.optional(v.boolean()),
    recurring: v.optional(v.string()),
  }).index("by_start", ["start"]),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(),
    priority: v.string(),
    category: v.string(),
    effort: v.optional(v.string()),
    reasoning: v.optional(v.string()),
    nextAction: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]).index("by_category", ["category"]),

  contacts: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    notes: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    lastInteraction: v.optional(v.number()),
    source: v.optional(v.string()),
  }).index("by_name", ["name"]),

  contentDrafts: defineTable({
    title: v.string(),
    content: v.string(),
    platform: v.string(),
    status: v.string(),
    scheduledFor: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    author: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]).index("by_platform", ["platform"]),

  ecosystemProducts: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    status: v.string(),
    health: v.optional(v.number()),
    category: v.optional(v.string()),
    metrics: v.optional(v.any()),
    links: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]),

  chatMessages: defineTable({
    sessionId: v.string(),
    role: v.string(),
    content: v.string(),
    channel: v.optional(v.string()),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  }).index("by_session", ["sessionId"]).index("by_timestamp", ["timestamp"]),

  chatSessions: defineTable({
    title: v.string(),
    channel: v.string(),
    lastMessage: v.optional(v.string()),
    messageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_updated", ["updatedAt"]),
});
