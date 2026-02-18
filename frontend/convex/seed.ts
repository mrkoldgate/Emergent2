import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    const day = 24 * hour;

    // Seed activities
    const activities = [
      { type: "agent", title: "Agent spawned sub-agent for research task", source: "openclaw", timestamp: now - 15 * 60000 },
      { type: "cron", title: "Daily digest cron completed successfully", source: "scheduler", timestamp: now - hour },
      { type: "message", title: "New message received on Telegram", source: "telegram", timestamp: now - 2 * hour },
      { type: "task", title: "Content draft approved for publication", source: "content", timestamp: now - 3 * hour },
      { type: "system", title: "System health check passed", source: "monitor", timestamp: now - 4 * hour },
      { type: "agent", title: "Memory consolidation completed", source: "openclaw", timestamp: now - 5 * hour },
    ];
    for (const activity of activities) {
      await ctx.db.insert("activities", activity);
    }

    // Seed calendar events
    const calendarEvents = [
      { title: "Team Standup", start: now + 2 * hour, end: now + 2.5 * hour, type: "meeting", color: "#3B82F6" },
      { title: "Content Review", start: now + day, end: now + day + hour, type: "task", color: "#8B5CF6" },
      { title: "Agent Maintenance", start: now + 2 * day, end: now + 2 * day + 2 * hour, type: "maintenance", color: "#F59E0B" },
      { title: "Client Call", start: now + 3 * day, end: now + 3 * day + hour, type: "meeting", color: "#10B981" },
    ];
    for (const event of calendarEvents) {
      await ctx.db.insert("calendarEvents", event);
    }

    // Seed tasks
    const tasks = [
      { title: "Launch new landing page", description: "Complete redesign and deploy", status: "pending", priority: "high", category: "Product", effort: "medium", reasoning: "Will increase conversion rate", nextAction: "Review final mockups", createdAt: now, updatedAt: now },
      { title: "Write weekly newsletter", description: "Curate top AI news", status: "in_progress", priority: "medium", category: "Content", effort: "low", reasoning: "Maintains audience engagement", nextAction: "Draft intro paragraph", createdAt: now, updatedAt: now },
      { title: "Optimize agent prompts", description: "Improve response quality", status: "pending", priority: "high", category: "Operations", effort: "high", reasoning: "Reduces token costs by 20%", nextAction: "Analyze current prompt performance", createdAt: now, updatedAt: now },
      { title: "Client onboarding automation", description: "Automate welcome sequence", status: "approved", priority: "medium", category: "Clients", effort: "medium", reasoning: "Saves 2 hours per client", nextAction: "Map current flow", createdAt: now, updatedAt: now },
    ];
    for (const task of tasks) {
      await ctx.db.insert("tasks", task);
    }

    // Seed content drafts
    const contentDrafts = [
      { title: "AI Agents in 2026: The Complete Guide", content: "Introduction to autonomous AI agents and how they're transforming productivity...", platform: "blog", status: "draft", createdAt: now, updatedAt: now },
      { title: "Thread: Building with OpenClaw", content: "1/ Just shipped my first autonomous agent with @OpenClaw. Here's what I learned...", platform: "twitter", status: "review", createdAt: now - day, updatedAt: now },
      { title: "OpenClaw Setup Tutorial", content: "In this video, I'll walk you through setting up OpenClaw from scratch...", platform: "youtube", status: "approved", scheduledFor: now + 2 * day, createdAt: now - 2 * day, updatedAt: now },
      { title: "Daily AI Digest #47", content: "Today's top stories: GPT-5.2 updates, new Claude features, and more...", platform: "newsletter", status: "published", publishedAt: now - day, createdAt: now - 2 * day, updatedAt: now },
    ];
    for (const draft of contentDrafts) {
      await ctx.db.insert("contentDrafts", draft);
    }

    // Seed ecosystem products
    const products = [
      { name: "OpenClaw Dashboard", slug: "dashboard", description: "Mission control for AI agents", status: "active", health: 98, category: "Tools", createdAt: now, updatedAt: now },
      { name: "Agent Memory System", slug: "memory", description: "Long-term memory for AI agents", status: "active", health: 95, category: "Core", createdAt: now, updatedAt: now },
      { name: "Content Automator", slug: "content-automator", description: "Automated content pipeline", status: "development", health: 75, category: "Tools", createdAt: now, updatedAt: now },
      { name: "Client Portal", slug: "client-portal", description: "Self-service client dashboard", status: "concept", health: 0, category: "Business", createdAt: now, updatedAt: now },
    ];
    for (const product of products) {
      await ctx.db.insert("ecosystemProducts", product);
    }

    // Seed chat session and messages
    const sessionId = await ctx.db.insert("chatSessions", {
      title: "General Assistant",
      channel: "webchat",
      messageCount: 4,
      createdAt: now - day,
      updatedAt: now,
    });

    const messages = [
      { sessionId: sessionId as unknown as string, role: "user", content: "What's on my schedule today?", channel: "webchat", timestamp: now - 2 * hour },
      { sessionId: sessionId as unknown as string, role: "assistant", content: "You have a team standup in 2 hours and a content review session tomorrow. Would you like me to prepare any materials?", channel: "webchat", timestamp: now - 2 * hour + 5000 },
      { sessionId: sessionId as unknown as string, role: "user", content: "Yes, prepare the content metrics report", channel: "webchat", timestamp: now - hour },
      { sessionId: sessionId as unknown as string, role: "assistant", content: "I've compiled the content metrics report. Key highlights: 15% increase in engagement this week, 3 new drafts pending review, and the newsletter open rate improved to 42%.", channel: "webchat", timestamp: now - hour + 8000 },
    ];
    for (const msg of messages) {
      await ctx.db.insert("chatMessages", msg);
    }

    // Seed contacts
    const contacts = [
      { name: "Alex Chen", email: "alex@techcorp.com", company: "TechCorp", role: "CTO", tags: ["prospect", "enterprise"], source: "referral", lastInteraction: now - day },
      { name: "Sarah Miller", email: "sarah@startup.io", company: "Startup.io", role: "Founder", tags: ["client", "active"], source: "inbound", lastInteraction: now - 2 * hour },
      { name: "James Wilson", email: "james@agency.co", company: "Creative Agency", role: "Director", tags: ["partner"], source: "conference", lastInteraction: now - 3 * day },
    ];
    for (const contact of contacts) {
      await ctx.db.insert("contacts", contact);
    }

    return { success: true, message: "Database seeded successfully" };
  },
});
