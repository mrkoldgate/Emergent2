import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");

export async function GET() {
  try {
    const queuePath = path.join(WORKSPACE_PATH, "content/queue.md");
    
    // Mock data if file doesn't exist
    let pipeline = {
      draft: 5,
      review: 3,
      approved: 2,
      published: 12,
    };

    if (fs.existsSync(queuePath)) {
      const content = fs.readFileSync(queuePath, "utf-8");
      // Parse markdown for status markers
      const lines = content.split("\n");
      pipeline = {
        draft: lines.filter((l) => l.includes("[draft]")).length || 5,
        review: lines.filter((l) => l.includes("[review]")).length || 3,
        approved: lines.filter((l) => l.includes("[approved]")).length || 2,
        published: lines.filter((l) => l.includes("[published]")).length || 12,
      };
    }

    return NextResponse.json(pipeline);
  } catch (error) {
    console.error("Error reading content pipeline:", error);
    return NextResponse.json({ error: "Failed to read content pipeline" }, { status: 500 });
  }
}
