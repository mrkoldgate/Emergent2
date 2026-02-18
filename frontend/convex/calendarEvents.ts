import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { 
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("calendarEvents").withIndex("by_start");
    if (args.startDate) {
      q = q.filter((q) => q.gte(q.field("start"), args.startDate!));
    }
    if (args.endDate) {
      q = q.filter((q) => q.lte(q.field("end"), args.endDate!));
    }
    return await q.collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    start: v.number(),
    end: v.number(),
    type: v.string(),
    color: v.optional(v.string()),
    allDay: v.optional(v.boolean()),
    recurring: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calendarEvents", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("calendarEvents"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    start: v.optional(v.number()),
    end: v.optional(v.number()),
    type: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("calendarEvents") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
