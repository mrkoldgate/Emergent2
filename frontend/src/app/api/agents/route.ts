import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");

export async function GET() {
  try {
    const registryPath = path.join(WORKSPACE_PATH, "agents/registry.json");
    
    // Mock data if file doesn't exist
    let agents = [
      {
        id: "main-agent",
        name: "Molty",
        role: "Primary Assistant",
        model: "claude-sonnet-4.5",
        level: "L4" as const,
        status: "active" as const,
        capabilities: ["Research", "Writing", "Code", "Analysis"],
        subAgents: ["researcher", "writer", "coder"],
        soul: "I am Molty, an autonomous AI agent focused on helping with research, writing, and analysis tasks. I aim to be helpful, accurate, and efficient.",
        rules: "Always verify information. Ask for clarification when needed. Provide sources. Don't make assumptions.",
      },
      {
        id: "researcher",
        name: "Research Agent",
        role: "Information Gatherer",
        model: "gpt-5.2",
        level: "L2" as const,
        status: "idle" as const,
        capabilities: ["Web Search", "Data Analysis", "Summarization"],
      },
      {
        id: "writer",
        name: "Content Writer",
        role: "Content Creator",
        model: "claude-sonnet-4.5",
        level: "L2" as const,
        status: "active" as const,
        capabilities: ["Blog Posts", "Social Media", "Documentation"],
      },
      {
        id: "coder",
        name: "Code Agent",
        role: "Developer",
        model: "gpt-5.2",
        level: "L3" as const,
        status: "idle" as const,
        capabilities: ["Python", "TypeScript", "React", "Node.js"],
      },
    ];

    if (fs.existsSync(registryPath)) {
      const data = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
      agents = data.agents || agents;
    }

    const status = {
      total: agents.length,
      healthy: agents.filter((a) => a.status !== "offline").length,
      unhealthy: agents.filter((a) => a.status === "offline").length,
      activeSubAgents: agents.filter((a) => a.status === "active" && a.level !== "L4").length,
    };

    return NextResponse.json({ agents, status });
  } catch (error) {
    console.error("Error reading agents:", error);
    return NextResponse.json({ error: "Failed to read agents" }, { status: 500 });
  }
}
