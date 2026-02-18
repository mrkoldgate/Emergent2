import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listSessions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("chatSessions")
      .withIndex("by_updated")
      .order("desc")
      .take(limit);
  },
});

export const getMessages = query({
  args: { 
    sessionId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("chatMessages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .take(limit);
  },
});

export const createSession = mutation({
  args: {
    title: v.string(),
    channel: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("chatSessions", {
      ...args,
      messageCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const sendMessage = mutation({
  args: {
    sessionId: v.string(),
    role: v.string(),
    content: v.string(),
    channel: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    await ctx.db.insert("chatMessages", {
      ...args,
      timestamp: now,
    });

    const sessions = await ctx.db
      .query("chatSessions")
      .filter((q) => q.eq(q.field("_id"), args.sessionId as any))
      .collect();
    
    if (sessions.length > 0) {
      const session = sessions[0];
      await ctx.db.patch(session._id, {
        lastMessage: args.content.substring(0, 100),
        messageCount: session.messageCount + 1,
        updatedAt: now,
      });
    }
  },
});
