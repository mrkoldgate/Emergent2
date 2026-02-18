import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");

export async function GET() {
  try {
    const cronsPath = path.join(WORKSPACE_PATH, "state/crons.json");
    
    // Mock data if file doesn't exist
    let jobs = [
      { name: "Daily Digest", schedule: "0 9 * * *", lastStatus: "success" as const, consecutiveErrors: 0, lastRun: Date.now() - 3600000 },
      { name: "Memory Sync", schedule: "*/30 * * * *", lastStatus: "success" as const, consecutiveErrors: 0, lastRun: Date.now() - 1800000 },
      { name: "Health Check", schedule: "*/5 * * * *", lastStatus: "success" as const, consecutiveErrors: 0, lastRun: Date.now() - 300000 },
      { name: "Content Scheduler", schedule: "0 * * * *", lastStatus: "failed" as const, consecutiveErrors: 2, lastRun: Date.now() - 7200000 },
      { name: "Backup Agent State", schedule: "0 0 * * *", lastStatus: "success" as const, consecutiveErrors: 0, lastRun: Date.now() - 86400000 },
    ];

    if (fs.existsSync(cronsPath)) {
      const data = JSON.parse(fs.readFileSync(cronsPath, "utf-8"));
      jobs = data.jobs || jobs;
    }

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error reading cron health:", error);
    return NextResponse.json({ error: "Failed to read cron health" }, { status: 500 });
  }
}
