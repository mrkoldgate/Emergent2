import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || "", ".openclaw/workspace");

export async function GET() {
  try {
    const revenuePath = path.join(WORKSPACE_PATH, "state/revenue.json");
    
    // Mock data if file doesn't exist
    let revenue = {
      current: 12450,
      monthlyBurn: 3200,
      net: 9250,
      trend: 12.5,
    };

    if (fs.existsSync(revenuePath)) {
      const data = JSON.parse(fs.readFileSync(revenuePath, "utf-8"));
      revenue = data;
    }

    return NextResponse.json(revenue);
  } catch (error) {
    console.error("Error reading revenue:", error);
    return NextResponse.json({ error: "Failed to read revenue" }, { status: 500 });
  }
}
