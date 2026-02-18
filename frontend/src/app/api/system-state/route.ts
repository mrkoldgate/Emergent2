import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");

export async function GET() {
  try {
    const serversPath = path.join(WORKSPACE_PATH, "state/servers.json");
    
    // Mock data if file doesn't exist
    let services = [
      { name: "OpenClaw Gateway", status: "up" as const, port: 18789, lastCheck: Date.now() },
      { name: "Agent Runtime", status: "up" as const, port: 3001, lastCheck: Date.now() - 30000 },
      { name: "Memory Service", status: "up" as const, port: 5432, lastCheck: Date.now() - 60000 },
      { name: "Cron Scheduler", status: "up" as const, lastCheck: Date.now() - 120000 },
      { name: "Webhook Handler", status: "warning" as const, port: 8080, lastCheck: Date.now() - 300000 },
    ];

    if (fs.existsSync(serversPath)) {
      const data = JSON.parse(fs.readFileSync(serversPath, "utf-8"));
      services = data.services || services;
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error reading system state:", error);
    return NextResponse.json(
      { error: "Failed to read system state" },
      { status: 500 }
    );
  }
}
