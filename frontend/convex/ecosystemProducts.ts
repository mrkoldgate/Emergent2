import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("ecosystemProducts");
    if (args.status) {
      q = q.withIndex("by_status").filter((q) => q.eq(q.field("status"), args.status));
    }
    return await q.collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ecosystemProducts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    status: v.string(),
    health: v.optional(v.number()),
    category: v.optional(v.string()),
    metrics: v.optional(v.any()),
    links: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("ecosystemProducts", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("ecosystemProducts"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
    health: v.optional(v.number()),
    category: v.optional(v.string()),
    metrics: v.optional(v.any()),
    links: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});
