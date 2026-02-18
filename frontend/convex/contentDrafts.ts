import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("contentDrafts");
    if (args.status) {
      q = q.withIndex("by_status").filter((q) => q.eq(q.field("status"), args.status));
    }
    return await q.order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    platform: v.string(),
    status: v.string(),
    scheduledFor: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("contentDrafts", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("contentDrafts"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    platform: v.optional(v.string()),
    status: v.optional(v.string()),
    scheduledFor: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("contentDrafts") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
